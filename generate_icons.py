#!/usr/bin/env python3
"""
Generate simple PNG icons for the Chrome extension
Requires PIL/Pillow: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os

    def create_icon(size, filename):
        """Create a simple dark theme icon"""
        # Create image with dark background
        img = Image.new('RGB', (size, size), color='#1a1a1a')
        draw = ImageDraw.Draw(img)

        # Draw a moon/crescent shape to represent dark theme
        # Draw outer circle (moon)
        padding = size // 8
        draw.ellipse(
            [padding, padding, size - padding, size - padding],
            fill='#ffd700',
            outline='#ffed4e',
            width=max(1, size // 32)
        )

        # Draw inner circle to create crescent effect
        offset = size // 6
        draw.ellipse(
            [padding + offset, padding, size - padding + offset, size - padding],
            fill='#1a1a1a',
            outline='#1a1a1a'
        )

        # Save the icon
        img.save(filename, 'PNG')
        print(f'Created {filename} ({size}x{size})')

    # Create icons directory if it doesn't exist
    icons_dir = 'icons'
    if not os.path.exists(icons_dir):
        os.makedirs(icons_dir)

    # Generate icons in different sizes
    create_icon(16, os.path.join(icons_dir, 'icon16.png'))
    create_icon(48, os.path.join(icons_dir, 'icon48.png'))
    create_icon(128, os.path.join(icons_dir, 'icon128.png'))

    print('\nIcons generated successfully!')
    print('If you want custom icons, replace these files with your own designs.')

except ImportError:
    print('Error: Pillow (PIL) is not installed.')
    print('Install it with: pip install Pillow')
    print('\nAlternatively, you can:')
    print('1. Create icons manually using an image editor')
    print('2. Use an online icon generator')
    print('3. Required sizes: 16x16, 48x48, and 128x128 pixels')
    exit(1)
except Exception as e:
    print(f'Error generating icons: {e}')
    exit(1)
