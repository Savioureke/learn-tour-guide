Add-Type -AssemblyName System.Drawing

function Build-LTG-Icons {
    param(
        [string]$TargetDir
    )

    if (-not (Test-Path $TargetDir)) {
        New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
    }

    $sizes = @(
        @{ Name = "favicon-16x16.png"; Size = 16 },
        @{ Name = "favicon-32x32.png"; Size = 32 },
        @{ Name = "mstile-150x150.png"; Size = 150 },
        @{ Name = "apple-touch-icon.png"; Size = 180 },
        @{ Name = "android-chrome-192x192.png"; Size = 192 },
        @{ Name = "android-chrome-512x512.png"; Size = 512 }
    )

    foreach ($entry in $sizes) {
        $dim = $entry.Size
        $bmp = New-Object System.Drawing.Bitmap($dim, $dim, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $gfx = [System.Drawing.Graphics]::FromImage($bmp)

        $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $gfx.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
        $gfx.Clear([System.Drawing.Color]::Transparent)

        $pad = [Math]::Max(1.0, [double]($dim * 0.04))
        $w = [double]($dim - ($pad * 2.0))
        $h = [double]($dim - ($pad * 2.0))
        $rad = [double]($dim * 0.22)

        # Rounded rectangle path
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddArc($pad, $pad, $rad, $rad, 180, 90)
        $path.AddArc($pad + $w - $rad, $pad, $rad, $rad, 270, 90)
        $path.AddArc($pad + $w - $rad, $pad + $h - $rad, $rad, $rad, 0, 90)
        $path.AddArc($pad, $pad + $h - $rad, $rad, $rad, 90, 90)
        $path.CloseFigure()

        # Dark navy background
        $navyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 24, 30, 75)) # #181E4B
        $gfx.FillPath($navyBrush, $path)
        $navyBrush.Dispose()

        # Accent border
        if ($dim -ge 32) {
            $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 241, 165, 1), [Math]::Max(1.0, [double]($dim * 0.025)))
            $gfx.DrawPath($borderPen, $path)
            $borderPen.Dispose()
        }

        # Coral accent star dot for larger sizes
        if ($dim -ge 64) {
            $dotX = [double]($dim * 0.78)
            $dotY = [double]($dim * 0.20)
            $dotR = [double]($dim * 0.05)
            $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 223, 105, 81)) # #DF6951
            $gfx.FillEllipse($dotBrush, $dotX - $dotR, $dotY - $dotR, $dotR * 2.0, $dotR * 2.0)
            $dotBrush.Dispose()
        }

        # Typography selection
        $fontName = "Arial"
        $installed = (New-Object System.Drawing.Text.InstalledFontCollection).Families | ForEach-Object { $_.Name }
        if ($installed -contains "Poppins") {
            $fontName = "Poppins"
        } elseif ($installed -contains "Segoe UI") {
            $fontName = "Segoe UI"
        }

        $fontSize = [double]($dim * 0.40)
        if ($dim -eq 16) { $fontSize = 8.0 }
        elseif ($dim -eq 32) { $fontSize = 15.0 }

        $font = New-Object System.Drawing.Font($fontName, $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

        $strLT = "LT"
        $strG = "G"
        $szLT = $gfx.MeasureString($strLT, $font)
        $szG = $gfx.MeasureString($strG, $font)

        $totW = ($szLT.Width * 0.85) + ($szG.Width * 0.85)
        $xLT = ($dim - $totW) / 2.0
        $yLT = ($dim - $szLT.Height) / 2.0

        if ($dim -eq 16) {
            $xLT = 0.5
            $yLT = 1.0
        } elseif ($dim -eq 32) {
            $xLT = 2.0
            $yLT = 5.0
        }

        $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 241, 165, 1)) # #F1A501

        $gfx.DrawString($strLT, $font, $whiteBrush, $xLT, $yLT)
        $xG = $xLT + ($szLT.Width * 0.82)
        $gfx.DrawString($strG, $font, $goldBrush, $xG, $yLT)

        # Cleanup & Save
        $whiteBrush.Dispose()
        $goldBrush.Dispose()
        $font.Dispose()
        $path.Dispose()
        $gfx.Dispose()

        $filePath = Join-Path $TargetDir $entry.Name
        $bmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
    }

    # Generate multi-size favicon.ico from the 32x32 image
    $src32 = Join-Path $TargetDir "favicon-32x32.png"
    $icoPath = Join-Path $TargetDir "favicon.ico"
    if (Test-Path $src32) {
        $bmp32 = [System.Drawing.Bitmap]::FromFile($src32)
        $hIcon = $bmp32.GetHicon()
        $icon = [System.Drawing.Icon]::FromHandle($hIcon)

        $stream = [System.IO.File]::Open($icoPath, [System.IO.FileMode]::Create)
        $icon.Save($stream)
        $stream.Close()
        $icon.Dispose()
        $bmp32.Dispose()
    }

    Write-Host "Generated LTG icons in: $TargetDir"
}

# 1. Generate for learn_tour_guide
Build-LTG-Icons -TargetDir "public/assets/img/favicons"

# Copy root favicon files
Copy-Item "public/assets/img/favicons/favicon.ico" -Destination "public/favicon.ico" -Force
Copy-Item "public/assets/img/favicons/favicon-32x32.png" -Destination "public/favicon.png" -Force

# 2. Copy SVG favicon to assets and root
$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="ltgBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181E4B"/>
      <stop offset="100%" stop-color="#0E1230"/>
    </linearGradient>
    <linearGradient id="ltgGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F1A501"/>
      <stop offset="100%" stop-color="#DF6951"/>
    </linearGradient>
    <linearGradient id="ltgBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F1A501" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#DF6951" stop-opacity="0.6"/>
    </linearGradient>
  </defs>
  <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#ltgBg)"/>
  <rect x="22" y="22" width="468" height="468" rx="106" fill="none" stroke="url(#ltgBorder)" stroke-width="12"/>
  <circle cx="410" cy="102" r="20" fill="#DF6951"/>
  <circle cx="410" cy="102" r="10" fill="#F1A501"/>
  <text x="256" y="325" font-family="'Poppins', 'Rubik', -apple-system, sans-serif" font-size="190" font-weight="900" text-anchor="middle" letter-spacing="-8">
    <tspan fill="#FFFFFF">LT</tspan><tspan fill="url(#ltgGold)">G</tspan>
  </text>
  <rect x="140" y="365" width="232" height="14" rx="7" fill="url(#ltgGold)"/>
</svg>
"@

Set-Content -Path "public/favicon.svg" -Value $svgContent -Encoding utf8
Set-Content -Path "public/assets/img/favicons/favicon.svg" -Value $svgContent -Encoding utf8

# 3. Update tour_guard project outside this directory
if (Test-Path "..\tour_guard") {
    Write-Host "Updating tour_guard project favicons..."
    
    # public assets
    Build-LTG-Icons -TargetDir "..\tour_guard\public\assets\img\favicons"
    Copy-Item "public/favicon.ico" -Destination "..\tour_guard\public\favicon.ico" -Force
    Set-Content -Path "..\tour_guard\public\favicon.svg" -Value $svgContent -Encoding utf8
    Set-Content -Path "..\tour_guard\public\assets\img\favicons\favicon.svg" -Value $svgContent -Encoding utf8

    # react public assets if present
    if (Test-Path "..\tour_guard\react") {
        Build-LTG-Icons -TargetDir "..\tour_guard\react\public\assets\img\favicons"
        Copy-Item "public/favicon.ico" -Destination "..\tour_guard\react\public\favicon.ico" -Force
        Set-Content -Path "..\tour_guard\react\public\favicon.svg" -Value $svgContent -Encoding utf8
        Set-Content -Path "..\tour_guard\react\public\assets\img\favicons\favicon.svg" -Value $svgContent -Encoding utf8
    }
    
    Write-Host "tour_guard project favicons successfully updated!"
}
