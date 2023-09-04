import weatherClearIcon from "../icons/weather-clear.svg";
import weatherMostlyClearIcon from "../icons/weather-mostly-clear.svg";
import weatherOvercastIcon from "../icons/weather-overcast.svg";
import weatherRainIcon from "../icons/weather-rain.svg";
import weatherThunderstormIcon from "../icons/weather-thunderstorm.svg";
import weatherSnowIcon from "../icons/weather-snow.svg";

export function getInfoFromWeathercode(code: any) {
    let codeParsed = parseInt(code);
    switch(codeParsed) {
        case -1:
            return { icon: weatherClearIcon, description: "Loading..." };
        case 0:
            return { icon: weatherClearIcon, description: "Clear sky" };
        case 1:
            return { icon: weatherMostlyClearIcon, description: "Mostly clear" };
        case 2:
            return { icon: weatherMostlyClearIcon, description: "Partly cloudly" };
        case 3:
            return { icon: weatherOvercastIcon, description: "Overcast" };
        case 45:
        case 48: // intentional, 45 and 48
            return { icon: weatherOvercastIcon, description: "Foggy" };
        case 51:
            return { icon: weatherRainIcon, description: "Light drizzle" };
        case 53:
            return { icon: weatherRainIcon, description: "Moderate drizzle" };
        case 55:
            return { icon: weatherRainIcon, description: "Heavy drizzle" };
        case 56:
            return { icon: weatherRainIcon, description: "Light freezing drizzle" };
        case 57:
            return { icon: weatherRainIcon, description: "Heavy freezing drizzle" };
        case 61:
            return { icon: weatherRainIcon, description: "Light rain" };
        case 63:
            return { icon: weatherRainIcon, description: "Moderate rain" };
        case 65:
            return { icon: weatherRainIcon, description: "Heavy rain" };
        case 66:
            return { icon: weatherRainIcon, description: "Light freezing rain" };
        case 67:
            return { icon: weatherRainIcon, description: "Heavy freezing rain" };
        case 71:
            return { icon: weatherSnowIcon, description: "Light snowfall" };
        case 73:
            return { icon: weatherSnowIcon, description: "Moderate snowfall" };
        case 75:
            return { icon: weatherSnowIcon, description: "Heavy snowfall" };
        case 77:
            return { icon: weatherSnowIcon, description: "Snow grains" };
        case 80:
            return { icon: weatherRainIcon, description: "Light rain showers" };
        case 81:
            return { icon: weatherRainIcon, description: "Moderate rain showers" };
        case 82:
            return { icon: weatherRainIcon, description: "Violent rain showers" };
        case 85:
            return { icon: weatherSnowIcon, description: "Light snow showers" };
        case 86:
            return { icon: weatherSnowIcon, description: "Heavy snow showers" };
        case 95:
            return { icon: weatherThunderstormIcon, description: "Thunderstorm" };
        case 96:
            return { icon: weatherThunderstormIcon, description: "Thunderstorm with light hail" };
        case 99:
            return { icon: weatherThunderstormIcon, description: "Thunderstorm with heavy hail" };
    }
}