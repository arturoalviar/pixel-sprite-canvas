var colors = {
    "Alizarin": "#E74C3C",
  "Amber": "#FFC107",
  "Amethyst": "#9B59B6",
  "Asbestos": "#7F8C8D",
  "Belize Hole": "#2980B9",
  "Black": "#212121",
  "Blue": "#2196F3",
  "Blue Grey": "#607D8B",
  "Brown": "#795548",
  "Carrot": "#E67E22",
  "Clouds": "#ECF0F1",
  "Concrete": "#95A5A6",
  "Cyan": "#00BCD4",
  "Dark Orange": "#FF5722",
  "Deep Purple": "#673AB7",
  "Emerald": "#2ECC71",
  "Gery": "#9E9E9E",
  "Green": "#4CAF50",
  "Green Sea": "#1ABC9C",
  "Indigo": "#3F51B5",
  "Light Blue": "#03A9F4",
  "Light Green": "#8BC34A",
  "Lime": "#CDDC39",
  "Midnight Blue": "#2C3E50",
  "Nephritis": "#27AE60",
  "Orange": "#FF9800",
  "Peter River": "#3498DB",
  "Pink": "#E91E63",
  "Pomergranate": "#C0392B",
  "Pumpkin": "#D35400",
  "Purple": "#9C27B0",
  "Red": "#F44336",
  "Silver": "#BDC3C7",
  "Sun Flower": "#F1C40F",
  "Teal": "#009688",
  "Turqoise": "#1ABC9C",
  "Wet Asphalt": "#34495E",
  "White": "#FAFAFA",
  "Wisteria": "#8E44AD",
  "Yellow": "#FFEB3B"
};


var makeColorDropdown = function() {
    var colorDD = $('#color-dropdown');
    var choices = '';
    for (var color in colors) {
        choices += ('<option>' + color + '</option>');
    }
    colorDD.append(choices);

};

var getCurrentColor = function() {
    var color = $('#color-dropdown').val();
    return colors[color];
};

var removeCanvas = function() {
    $('.canvas-container').empty();
};


var populatePixels = function(pixelCount) {
    var canvas = $('.canvas');
    var container = $('.canvas-container');
    var canvasWidth = 640;
    var pixelRowWidth = canvasWidth / pixelCount;
    for (var i = 0; i < pixelCount; i++) {
        var pixelRow = $('<div/>')
            .addClass('row group')
            .appendTo(container);

        for (var j = 0; j < pixelCount; j++) {
            $('<div/>').addClass('pixel-block')
                .css({
                    'width': pixelRowWidth,
                    'height': pixelRowWidth
                })
                .appendTo(pixelRow);
        }
    }
    pixelBlockPaint();
};


$(document).ready(function() {
    var $pixelDropdown = $('#pixel-dropdown');
    var pixelCount = $('#pixel-dropdown').val();
    populatePixels(pixelCount);
    makeColorDropdown();
    var $clear = $('#clear');
    var $fill = $('#fill');
    var $colorDropdown = $('#color-dropdown');

    $pixelDropdown.on('change', function() {
        var pixelCount = $pixelDropdown.val();
        removeCanvas();
        populatePixels(pixelCount);
    });

    $colorDropdown.on('change', function() {
        var selectedColor = getCurrentColor();
        $('.current-color').css({
            'background-color': selectedColor
        });
        $('.current-color-val').text(selectedColor);
    });


    $clear.on('click', function() {
        $('.pixel-block').css({
            'background': colors.White
        });
    });

    $fill.on('click', function() {
        var selectedColor = getCurrentColor();
        $('.pixel-block').css({
            'background': selectedColor
        });
    });

    pixelBlockPaint();
});

var pixelBlockPaint = function (){
$('.pixel-block').on('click', function() {

    if ($('#erase').is(':checked')) {
        $(this).css({
            'background-color': colors.White
        });
        return;
    }
    var selectedColor = getCurrentColor();
    $(this).css({
        'background-color': selectedColor
    });
});
};

window.onkeyup = function(e){
    e.preventDefault();
    var toggleKey = e.keyCode ? e.keyCode : e.which;

    if(toggleKey == 69){
        if ($('#erase').is(':checked')) {
            $('#erase').prop('checked', false);
        }else{
            $('#erase').prop('checked', true);
        }
    }
};
