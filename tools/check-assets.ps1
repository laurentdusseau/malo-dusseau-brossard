# Verifie que chaque asset reference (HTML/CSS/JS/manifest) est dans Git.
# Etat = apres le prochain commit (HEAD + index). Exit 1 si trou.
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$Ext = "jpg|jpeg|png|webp|gif|svg|mp4|webm|ico|woff2?"
$SourceGlob = "\.(html|css|js|webmanifest|xml)$"

function Get-StagedNames {
  git diff --cached --name-only --diff-filter=ACMR
}

function Get-FileContentAfterCommit([string]$path) {
  $staged = git diff --cached --name-only -- $path
  if ($staged) {
    return git show ":$path" 2>$null
  }
  git show "HEAD:$path" 2>$null
}

function Normalize-Asset([string]$raw) {
  if (-not $raw) { return $null }
  $p = $raw.Trim()
  if ($p -match "^data:") { return $null }
  if ($p -match "^https?://cdn\.") { return $null }
  if ($p -match "^https?://[^/]*jsdelivr") { return $null }
  $p = $p -replace "\?.*$", ""
  $p = $p -replace "#.*$", ""
  $p = $p -replace "^https://malodusseaubrossard\.com/", ""
  $p = $p -replace "^/", ""
  $p = $p -replace "^\.\./", ""
  if ($p -notmatch "^(assets/|favicon\.svg)") { return $null }
  if ($p -notmatch "\.(?:$Ext)$") { return $null }
  return ($p -replace "\\", "/")
}

function Extract-Assets([string]$text) {
  $found = New-Object System.Collections.Generic.HashSet[string]
  if (-not $text) { return $found }
  $rx = '(?i)(?:\.\./)?assets/[a-zA-Z0-9_./-]+\.(?:' + $Ext + ')|(?i)favicon\.svg'
  [regex]::Matches($text, $rx) | ForEach-Object {
    $n = Normalize-Asset $_.Value
    if ($n) { [void]$found.Add($n) }
  }
  return $found
}

$tracked = git ls-files
$stagedSet = New-Object "System.Collections.Generic.HashSet[string]"
Get-StagedNames | ForEach-Object { [void]$stagedSet.Add(($_ -replace "\\", "/")) }
$inGit = New-Object "System.Collections.Generic.HashSet[string]"
$tracked | ForEach-Object { [void]$inGit.Add(($_ -replace "\\", "/")) }

$sources = @(git ls-files | Where-Object { $_ -match $SourceGlob })
Get-StagedNames | Where-Object { $_ -match $SourceGlob } | ForEach-Object {
  if ($sources -notcontains $_) { $sources += $_ }
}

$refs = New-Object System.Collections.Generic.HashSet[string]
foreach ($src in $sources) {
  $content = Get-FileContentAfterCommit $src
  Extract-Assets $content | ForEach-Object { [void]$refs.Add($_) }
}

$missingDisk = @()
$missingGit = @()
foreach ($asset in ($refs | Sort-Object)) {
  $disk = Join-Path $Root ($asset -replace "/", [IO.Path]::DirectorySeparatorChar)
  $willBeInGit = $inGit.Contains($asset) -or $stagedSet.Contains($asset)
  if (-not (Test-Path -LiteralPath $disk)) { $missingDisk += $asset }
  elseif (-not $willBeInGit) { $missingGit += $asset }
}

if ($missingDisk.Count -or $missingGit.Count) {
  if ($missingDisk.Count) {
    Write-Host "ASSET ABSENT DU DISQUE (404 garanti) :"
    $missingDisk | ForEach-Object { Write-Host "  - $_" }
  }
  if ($missingGit.Count) {
    Write-Host "ASSET REFERENCE MAIS PAS DANS GIT (casse la prod) :"
    $missingGit | ForEach-Object { Write-Host "  - $_" }
  }
  Write-Host "Commit INTERDIT. git add le fichier dans le MEME commit que la reference."
  exit 1
}

Write-Host ("OK " + $refs.Count + " assets references, tous presents dans Git.")
exit 0
