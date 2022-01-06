<?php
// Panorama extension, https://github.com/GiovanniSalmeri/yellow-panorama

class YellowPanorama {
    const VERSION = "0.8.16";
    public $yellow;         //access to API
    
    // Handle initialisation
    public function onLoad($yellow) {
        $this->yellow = $yellow;
    }
    
    // Handle page content of shortcut
    public function onParseContentShortcut($page, $name, $text, $type) {
        $output = null;
        if ($name=="panorama" && ($type=="block" || $type=="inline")) {
            list($name, $alt, $start) = $this->yellow->toolbox->getTextArguments($text);
            if (!is_numeric($start)) $start = 50;
            $output .= "<div class=\"panorama\">\n";
            $output .= "<div class=\"panorama-sliding\">\n";
            $output .= "<img src=\"".$this->yellow->system->get("coreServerBase").$this->yellow->system->get("CoreImageLocation").htmlspecialchars($name)."\" alt=\"".htmlspecialchars($alt)."\" data-start=\"".htmlspecialchars($start)."\"/>\n";
            $output .= "</div>\n";
            $output .= "<span class=\"icon\"></span>\n";
            $output .= "</div>\n";
        }
        return $output;
    }
    
    // Handle page extra data
    public function onParsePageExtra($page, $name) {
        $output = null;
        if ($name == "header") {
            $extensionLocation = $this->yellow->system->get("coreServerBase").$this->yellow->system->get("coreExtensionLocation");
            $output .= "<script type=\"text/javascript\" defer=\"defer\" src=\"{$extensionLocation}panorama.js\"></script>\n";
            $output .= "<link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"{$extensionLocation}panorama.css\" />\n";
        }
        return $output;
    }
}
