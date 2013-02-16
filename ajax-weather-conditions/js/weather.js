loadWeatherWidget("feed-proxy.php?url=http://w1.weather.gov/xml/current_obs/KBED.xml");

function loadWeatherWidget(weatherXmlUrl){
    var tempF;
    var iconUrlName;
    var weatherCondition;
    var weatherConditionClass;

    $.ajax({
        type: "GET",
        url: weatherXmlUrl,
        dataType: "xml",
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $(document).ready(function(){
                if ($("#weather-widget").length) {
                    $("#weather-widget").hide();
                }
            });
        },
        success: function(data){
            var xml;
            if (typeof data == "string") {
              xml = new ActiveXObject("Microsoft.XMLDOM");
              xml.async = false;
              xml.loadXML(data);
            } 
            else {
              xml = data;
            }
            // Returned data available in object "xml"
            
            weatherCondition = $(xml).find('weather').text();
            tempF = parseInt($(xml).find("temp_f").text(), 10);
            iconUrlName = $(xml).find("icon_url_name").text();
            
            //Determining the weather status based on "icon_url_name" in the XML
            switch (iconUrlName) {
                case "bkn.png":
                    weatherConditionClass = "weather-cloudy";
                    break;
                case "nbkn.png":
                    weatherConditionClass = "weather-night-cloudy";
                    break;
                case "skc.png":
                    weatherConditionClass = "weather-sunny";
                    break;
                case "nskc.png":
                    weatherConditionClass = "weather-night-clear";
                    break;
                case "few.png":
                    weatherConditionClass = "weather-partly-cloudy";
                    break;
                case "nfew.png":
                    weatherConditionClass = "weather-night-cloudy";
                    break;
                case "sct.png":
                    weatherConditionClass = "weather-partly-cloudy";
                    break;
                case "nsct.png":
                    weatherConditionClass = "weather-night-cloudy";
                    break;
                case "ovc.png":
                    weatherConditionClass = "weather-overcast";
                    break;
                case "novc.png":
                    weatherConditionClass = "weather-overcast";
                    break;
                case "hi_shwrs.png":
                case "hi_nshwrs.png":
                case "ra1.png":
                case "nra.png":
                case "fzrara.png":
                case "fzra.png":;
                case "ip.png":
                case "mix.png":
                case "nmix.png":
                case "raip.png":
                case "rasn.png":
                case "nrasn.png":
                case "shra.png":
                    weatherConditionClass = "weather-rainy";
                    break;
                case "tsra.png":
                case "ntsra.png":
                    weatherConditionClass = "weather-thunderstorm";
                    break;
                case "sn.png":
                case "nsn.png":
                    weatherConditionClass = "weather-snowing";
                    break;
                case "wind.png":
                case "nwind.png":
                    weatherConditionClass = "weather-windy";
                    break;
                case "hi_tsra.png":
                    weatherConditionClass = "weather-thunderstorm";
                    break;
                case "hi_ntsra.png":
                    weatherConditionClass = "weather-thunderstorm";
                    break;
                default:
                    weatherConditionClass = "weather-icon-unavailable";
            };
            
            //Writing the temperature to the page
            $(document).ready(function(){
                var $weatherWidget = $("#weather-widget");
                
                $weatherWidget
                  .addClass(weatherConditionClass)
                  
                  $("<span class='weather-widget-temp'/>")
                    .append(tempF + "&ordm;")
                    .appendTo($weatherWidget);
                  
                  $("<span class='weather-widget-condition'/>")
                    .append(weatherCondition)
                    .appendTo($weatherWidget);;
            });
        }
    });
}
