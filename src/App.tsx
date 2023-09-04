import { useEffect, useState } from "react";
import {
    Header,
    HeaderDropdown,
    HeaderDropdownMenu,
    HeaderDropdownMenuItem,
    HeaderLocation,
    HeaderLogo,
    HeaderPoweredBy,
    HeaderSection,
} from "./styles/Header.tsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    Grid,
    GridItem,
    ItemDesc,
    ItemInfo,
    ItemTitle,
} from "./styles/Grid.tsx";
import { getInfoFromWeathercode } from "./assets/js/weathercode.ts";
import { styled } from "styled-components";

function App() {
    const [unitTemperature, setUnitTemperature] = useState("celsius");
    const [dropdownTemperature, setDropdownTemperature] = useState(false);

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        city: "Loading",
        country: "Loading",
        fallback: true,
    });
    const [data, setData] = useState({
        loading: true,
        daily: {
            time: [],
            weathercode: [],
            temperature_2m_min: [],
            temperature_2m_max: [],
            apparent_temperature_min: [],
            apparent_temperature_max: [],
            sunrise: [],
            sunset: [],
            precipitation_probability_max: [],
            windspeed_10m_max: [],
            winddirection_10m_dominant: [],
        },
    });

    function load() {
        let unitTemp = localStorage.getItem("unitTemp");
        setUnitTemperature(unitTemp ? unitTemp : "celsius");
        localStorage.setItem("unitTemp", unitTemperature);

        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 3000); // times out after 3s
                await fetch(
                    // this api is often not working, so defaults to Vancouver, Canada
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
                    { signal: controller.signal }
                )
                    .then(async (locationResponse: any) => {
                        let locationJson = await locationResponse.json();
                        setLocation({
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                            city: locationJson.address.city,
                            country:
                                locationJson.address.country_code.toUpperCase(),
                            fallback: false,
                        });
                        loadPicture(locationJson.address.city);
                    })
                    .catch(() => {
                        setLocation({
                            latitude: 49.2497,
                            longitude: -123.1193,
                            city: "Vancouver",
                            country: "CA",
                            fallback: true,
                        });
                        loadPicture("Vancouver");
                    });

                let weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${
                        pos.coords.latitude ? pos.coords.latitude : 49.2497
                    }&longitude=${
                        pos.coords.longitude ? pos.coords.longitude : -123.1193
                    }&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=${unitTemp}&timezone=${Intl.DateTimeFormat()
                        .resolvedOptions()
                        .timeZone.replace("/", "%2F")}`
                );
                let weatherJson = await weatherResponse.json();
                console.log("Printing weather response JSON:", weatherJson);
                setData(weatherJson);
            } catch (err) {
                console.log(err);
            }
        });
    }
    async function loadPicture(city: string) {
        let citySearch = await (
            await fetch(`https://api.teleport.org/api/cities/?search=${city}`)
        ).json();
        let cityImage = await (
            await fetch(
                `https://api.teleport.org/api/urban_areas/slug:${citySearch._embedded[
                    "city:search-results"
                ][0].matching_alternate_names[0].name.toLowerCase()}/images/`
            )
        ).json();

        document.body.style.background = `linear-gradient(var(--background-with-image), var(--background-with-image)),
            center / cover url("${cityImage.photos[0].image.mobile}"), var(--background)`;
    }
    useEffect(() => {
        load();
    }, []);

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    function getDateIn(days: number) {
        return new Date(new Date().valueOf() + 86400000 * days); // 1 day in ms * days
    }
    function compareDate(a: Date, b: Date) {
        return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
    }
    function dateToRelative(date: Date) {
        if (!date) {
            return "Loading...";
        }
        if (compareDate(date, new Date())) return "Today";
        else if (compareDate(date, getDateIn(1))) return "Tomorrow";
        else return date.getDate() + " " + months[date.getMonth()];
    }
    function angleToDirection(angle: number) {
        let directions = [
            "north",
            "north-east",
            "east",
            "south-east",
            "south",
            "south-west",
            "west",
            "north-west",
        ];
        return directions[
            Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8
        ];
    }

    return (
        <>
            {data.loading ? (
                <>
                    <LoadingTitle>Loading...</LoadingTitle>
                    <LoadingDesc>
                        Please click "Allow" so Weather Master can give you
                        location-based weather.
                    </LoadingDesc>
                </>
            ) : (
                <>
                    <Header>
                        <HeaderSection>
                            <HeaderLocation>
                                {location.city}, {location.country}
                            </HeaderLocation>
                            <HeaderPoweredBy>
                                Powered by{" "}
                                <a href="https://open-meteo.com">Open Meteo</a>
                                {location.fallback ? (
                                    ""
                                ) : (
                                    <>
                                        {" "}
                                        and{" "}
                                        <a href="https://nominatim.org/">
                                            Nominatim
                                        </a>
                                    </>
                                )}
                            </HeaderPoweredBy>
                        </HeaderSection>
                        <HeaderLogo>Weather Master</HeaderLogo>
                        <HeaderSection $right>
                            °{unitTemperature === "celsius" ? "C" : "F"}
                            <HeaderDropdown>
                                <ChevronDownIcon
                                    onClick={() => {
                                        setDropdownTemperature(
                                            !dropdownTemperature
                                        );
                                    }}
                                    height={24}
                                    width={24}
                                    strokeWidth={1.5}
                                />
                                <HeaderDropdownMenu $open={dropdownTemperature}>
                                    <HeaderDropdownMenuItem
                                        onClick={() => {
                                            localStorage.setItem(
                                                "unitTemp",
                                                "celsius"
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        Celsius
                                    </HeaderDropdownMenuItem>
                                    <HeaderDropdownMenuItem
                                        onClick={() => {
                                            localStorage.setItem(
                                                "unitTemp",
                                                "fahrenheit"
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        Fahrenheit
                                    </HeaderDropdownMenuItem>
                                </HeaderDropdownMenu>
                            </HeaderDropdown>
                        </HeaderSection>
                    </Header>
                    <Grid>
                        {data.daily.time.slice(0, 6).map((r: string, index) => {
                            let description = getInfoFromWeathercode(
                                data.daily.weathercode[index]
                            );

                            let unitTempAbbreviation = `°${
                                unitTemperature === "celsius" ? "C" : "F"
                            }`;
                            let tempMin = data.daily.temperature_2m_min[index];
                            let tempMax = data.daily.temperature_2m_max[index];
                            let feelsLikeMin =
                                data.daily.apparent_temperature_min[index];
                            let feelsLikeMax =
                                data.daily.apparent_temperature_max[index];

                            let rainChance =
                                data.daily.precipitation_probability_max[index];

                            let windSpeed = data.daily.windspeed_10m_max[index];
                            let windDirection =
                                data.daily.winddirection_10m_dominant[index];

                            let sunrise = new Date(data.daily.sunrise[index]);
                            let sunset = new Date(data.daily.sunset[index]);

                            return (
                                <GridItem key={r}>
                                    <ItemTitle>
                                        {dateToRelative(new Date(r))}
                                    </ItemTitle>
                                    <ItemDesc>
                                        <img src={description?.icon} />{" "}
                                        {description?.description}, {tempMin}-
                                        {tempMax}
                                        {unitTempAbbreviation}
                                    </ItemDesc>
                                    <ItemInfo>
                                        Feels like {feelsLikeMin}-{feelsLikeMax}
                                        {unitTempAbbreviation}
                                    </ItemInfo>
                                    <ItemInfo>
                                        {(rainChance + "%").replace("0%", "No")}{" "}
                                        chance of rain
                                    </ItemInfo>
                                    <ItemInfo>
                                        Winds up to {windSpeed} km/h{" "}
                                        {angleToDirection(windDirection)}
                                    </ItemInfo>
                                    <ItemInfo>
                                        Sunrise at {sunrise.getHours()}:
                                        {sunrise.getMinutes()}, sunset at{" "}
                                        {sunset.getHours()}:
                                        {sunset.getMinutes()}
                                    </ItemInfo>
                                </GridItem>
                            );
                        })}
                    </Grid>
                </>
            )}
        </>
    );
}

export default App;

const LoadingTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: var(--primary);
    margin: 4px 0;
`;
const LoadingDesc = styled.p`
    color: var(--secondary);
    margin: 4px 0;
`;
