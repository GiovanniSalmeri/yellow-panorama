# Panorama 0.8.16

Panoramic scrollable images.

<p align="center"><img src="panorama-screenshot.png?raw=true" width="779" height="666" alt="Screenshot"></p>

## How to add a panoramic image

Create a `[panorama]` shortcut. 

The following arguments are available, all but the first argument are optional:

`Name` = file name    
`Alt` = alternative text for image   
`Position` (default:  `50`) = initial position of image, from `0` to `100`

The `media/images` folder is the place to store your images. Use this extension for embedding horizontally scrollable images.  The extension is useful for images which are wider than the maximum width of the page (typically 1000px).

## Example

Adding panoramic images:

    [panorama sunset.jpg]  
    [panorama sunset.jpg "Sunset"]  
    [panorama sunset.jpg "Sunset" 0]  

## Installation

[Download extension](https://github.com/GiovanniSalmeri/yellow-panorama/archive/master.zip) and copy zip file into your `system/extensions` folder. Right click if you use Safari.

## Developer

Giovanni Salmeri. [Get help](https://github.com/GiovanniSalmeri/yellow-panorama/issues).
