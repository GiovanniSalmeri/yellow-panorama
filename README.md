Panorama 0.8.10
=============
Panoramic scrollable images.

<p align="center"><img src="panorama-screenshot.png?raw=true" width="779" height="666" alt="Screenshot"></p>

## How to install extension

1. [Download and install Datenstrom Yellow](https://github.com/datenstrom/yellow/).
2. [Download extension](../../archive/master.zip). If you are using Safari, right click and select 'Download file as'.
3. Copy `master.zip` into your `system/extensions` folder.

To uninstall delete the [extension files](extension.ini).

## How to add a panoramic image

Create a `[panorama]` shortcut. 

The following arguments are available, all but the first argument are optional:

`Name` = file name    
`Alt` = alternative text for image   
`Position` (default:  `50`) = initial position of image, from `0` to `100`

The `media/images` folder is the place to store your images. Use this extension for embedding horizontally scrollable images.  The extension is useful for images which are wider than the maximum width of the page (typically 1000px).

## Examples

Adding panoramic images:

    [panorama sunset.jpg]  
    [panorama sunset.jpg "Sunset"]  
    [panorama sunset.jpg "Sunset" 0]  

## Developer

Giovanni Salmeri. [Get support](https://github.com/GiovanniSalmeri/yellow-panorama/issues).
