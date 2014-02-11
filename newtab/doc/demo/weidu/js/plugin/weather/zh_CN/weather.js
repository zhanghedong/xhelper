(function ($) {
    $.weather = function () {
        return new weather()
    };
    var weather = (function () {
        var weather = function () {
        };
        weather.prototype = {ip: '', city: '', cityID: '', defaultCityID: 101010100, isAuto: false, weather: '', tempUnit: PDI.get("weather", "tempUnit"), calendar: '', dateline: 0, weatherCache: '', container: '', content: '', weekOptions: [getI18nMsg("calendarSun"), getI18nMsg("calendarMon"), getI18nMsg("calendarTue"), getI18nMsg("calendarWed"), getI18nMsg("calendarThu"), getI18nMsg("calendarFri"), getI18nMsg("calendarSat")], imageOptions: {"1:1": {0: [0], 1: [1], 2: [2], 3: [7], 4: [8], 5: [3, 9, 10, 11, 12, 21, 22, 23, 24, 25], 6: [4], 7: [6, 13, 14, 15, 16, 17, 26, 27, 28], 8: [5], 9: [19], 10: [20, 30, 29, 31], 11: [18, 53, 32]}, "2:1": ['0-1', '0-5', '0-6', '0-7', '1-2', '5-7', '5-8', '7-10']}, bgImageOptions: {0: 0, 1: 1, 2: 1, 3: 3, 4: 3, 5: 3, 6: 3, 7: 7, 8: 7, 9: 7, 10: 10, 11: 11}, cityCache: '', init: function (opt) {
            var self = this;
            self.weatherCache = "";
            if (typeof opt != "undefined") {
                $.each(opt, function (i, n) {
                    self[i] = n
                })
            }
            self.getWeather()
        }, getWeather: function (fn) {
            var self = this;
            fn = fn || function () {
            };
            var curTime = Math.round(new Date().getTime() / 1000);
            if (self.cityID == '' || (self.isAuto && curTime >= self.dateline + 1 * 3600)) {
                self.cityID = self.defaultCityID;
                $.ajax({url: urlImg + "myapp/weather/city/global/getAddress.php?t=" + curTime, success: function (result) {
                    var result = JSON.parse(result);
                    if (typeof result == 'object' && result.city) {
                        $.ajax({url: urlImg + "tianqi/city.php?city=" + result.city + "&t=" + curTime, success: function (data) {
                            if (typeof data == 'string' && data.substr(0, 5) != 'ERROR') {
                                self.cityID = data
                            }
                            self.setWeatherData(fn)
                        }, error: function () {
                            self.setWeatherData(fn)
                        }})
                    } else {
                        self.setWeatherData(fn)
                    }
                }, error: function () {
                    self.setWeatherData(fn)
                }})
            } else {
                self.setWeatherData(fn)
            }
        }, getWeatherData: function (fn) {
            var self = this;
            fn = fn || function () {
            };
            $.ajax({url: urlImg + "myapp/weather/data/index.php?cityID=" + self.cityID + "&t=" + new Date().getTime(), success: function (data) {
                if (data) {
                    fn(data)
                }
            }, error: function () {
                if (self.cityID != self.defaultCityID) {
                    self.cityID = self.defaultCityID;
                    self.getWeatherData(fn)
                }
            }})
        }, setWeatherData: function (fn) {
            var self = this;
            fn = fn || function () {
            };
            var curTime = Math.round(new Date().getTime() / 1000);
            if (self.cityID != "" && curTime >= self.dateline + 1 * 3600) {
                self.getWeatherData(function (data) {
                    try {
                        var weahterInfo = JSON.parse(data);
                        self.weatherCache = weahterInfo.weatherinfo;
                        self.city = weahterInfo.weatherinfo.city;
                        self.weather = {text: weahterInfo.weatherinfo.weather1, images: [weahterInfo.weatherinfo.img1, weahterInfo.weatherinfo.img2], temp: weahterInfo.weatherinfo.temp1, wind: weahterInfo.weatherinfo.wind1};
                        var weatherDate = Date.parse(weahterInfo.weatherinfo.date_y.replace(getI18nMsg('yearUnit'), "/").replace(getI18nMsg('monthUnit'), "/").replace(getI18nMsg('dateUnit'), "/"));
                        weatherDate = new Date(weatherDate);
                        self.calendar = {year: weatherDate.getYear(), month: weatherDate.getMonth(), date: weatherDate.getDate(), day: weatherDate.getDay(), weekDay: weahterInfo.weatherinfo.week};
                        self.dateline = curTime;
                        PDI.set('weather', '', {city: self.city, cityID: self.cityID, isAuto: self.isAuto, weather: self.weather, tempUnit: self.tempUnit, calendar: self.calendar, dateline: self.dateline});
                        fn();
                        self.initWeatherApp()
                    } catch (e) {
                        if (self.cityID != self.defaultCityID) {
                            self.cityID = self.defaultCityID;
                            self.setWeatherData(fn)
                        }
                    }
                })
            } else {
                fn();
                self.initWeatherApp()
            }
        }, getWeatherImage: function (img1, img2) {
            var self = this;
            var weatherImage = '';
            if (typeof self.weather.images != 'undefined') {
                $.each(self.imageOptions["1:1"], function (i, n) {
                    if (n.indexOf(1 * img1) > -1) {
                        weatherImage += i;
                        return false
                    }
                });
                $.each(self.imageOptions["1:1"], function (i, n) {
                    img2 = img2 == img1 ? 99 : img2;
                    if (n.indexOf(1 * img2) > -1) {
                        if (weatherImage != i) {
                            if (i > weatherImage) {
                                var _tmpWeatherImage = weatherImage + '-' + i
                            } else {
                                var _tmpWeatherImage = i + '-' + weatherImage
                            }
                            if (self.imageOptions["2:1"].indexOf(_tmpWeatherImage) > -1) {
                                weatherImage += weatherImage == "" ? i : "-" + i
                            }
                        }
                        return false
                    }
                })
            }
            return weatherImage == '' ? 'logo.png' : weatherImage + '.png'
        }, initWeatherApp: function () {
            var self = this;
            self.container.find('.weatherApp').remove();
            if (DBOX.width >= 180 && DBOX.height >= 90) {
                self.container.append($('<div class="weatherApp"><div class="preview"></div><div class="temp">' + self.weather.temp + '</div><div class="address">' + self.city + '</div><div class="weather">' + self.weather.text + '</div><div class="lunarCalendar">' + self.calendar.date + getI18nMsg('dateUnit') + " [" + self.calendar.weekDay + PDI.get("setup", "lunarCalendar") + ']</div></div>').css({'marginTop': DBOX.titleShow == true ? "-61px" : "-45px"}))
            } else if (DBOX.width >= 85 && DBOX.height >= 90) {
                self.container.append($('<div class="weatherApp small"><div class="preview"></div><div class="weather">' + '<font size="+1">' + self.weather.temp + "</font><br/>" + self.weather.text + '</div></div>').css({'marginTop': DBOX.titleShow == true ? "-61px" : "-45px"}))
            }
            self.container.find('.boxTitle').html('<a>' + self.weather.text + ' ' + self.weather.temp + '</a>');
            var weatherImage = new Image(), weatherImageUrl = urlImg + 'myapp/weather/img/m/' + self.getWeatherImage(self.weather.images[0], self.weather.images[1]);
            weatherLogoImageUrl = urlImg + 'myapp/weather/img/' + (self.container.hasClass('quick') ? 's/' : 'm/') + self.getWeatherImage(self.weather.images[0], self.weather.images[1]);
            weatherImage.onload = function () {
                self.container.find('.weatherApp .preview').css('backgroundImage', 'url(' + weatherImageUrl + ')');
                self.container.find('.boxLogo').css('backgroundImage', 'url(' + weatherLogoImageUrl + ')')
            };
            setTimeout(function () {
                weatherImage.src = weatherImageUrl
            }, 200)
        }, template: function (targetDialogObj, weatherCache) {
            var self = this;
            var curWeatherDate = Date.parse(weatherCache.date_y.replace(getI18nMsg('yearUnit'), "/").replace(getI18nMsg('monthUnit'), "/").replace(getI18nMsg('dateUnit'), "/"));
            var weatherForecast = '';
            for (var i = 1; i <= 4; i++) {
                var weatherImageUrl = urlImg + 'myapp/weather/img/m/' + self.getWeatherImage(weatherCache['img' + ((i - 1) * 2 + 1)], weatherCache['img' + ((i - 1) * 2 + 2)]);
                var weatherDate = curWeatherDate + (i - 1) * 3600 * 24 * 1000;
                weatherDate = new Date(weatherDate);
                weatherForecast += '<div class="weatherAbstract" index="' + i + '"><img class="weatherForecastImage" src="' + weatherImageUrl + '" /><div class="weatherText">' + self.weekOptions[weatherDate.getDay()] + '<br/>' + weatherCache['weather' + i] + '<br/>' + weatherCache['temp' + i].replace(/℃/g, "°") + '</div></div>'
            }
            var weatherDetailBG = '0';
            $.each(self.imageOptions["1:1"], function (i, n) {
                if (n.indexOf(1 * weatherCache['img1']) > -1) {
                    weatherDetailBG = self.bgImageOptions[i];
                    return false
                }
            });
            var template = '<div class="weatherContainer"><div class="weatherHeader"><div class="headerIcon"></div>' + getI18nMsg('weatherAppTitle') + '</div><div class="weatherBody"><div class="weatherDetail" style="background-image:url(' + urlImg + 'myapp/weather/img/bg/t01_' + weatherDetailBG + '.jpg)"><div class="weatherContent"><div class="weatherSketch"><div>' + weatherCache.temp1.replace(/℃/g, "°") + '</div><div>' + weatherCache.weather1 + '</div><div>' + weatherCache.wind1 + '</div><div class="line"></div><div>' + weatherCache.date_y + '&nbsp;' + weatherCache.week + '</div><div>' + PDI.get("setup", "lunarCalendar") + (PDI.get("setup", "ip") == '' ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;(IP:' + PDI.get("setup", "ip") + ')') + '</div></div><div class="weatherDescription"><span class="cityName">' + weatherCache.city + '</span>' + (self.isAuto ? '<span class="cityAuto">auto</span>' : '') + '<span class="citySetting"> </span></div></div><div class="weatherAbout"><ul><li title="' + weatherCache.index_d + '"><div class="clothes"></div><div>&nbsp;&nbsp;' + getI18nMsg('weatherDressingIndex') + ': ' + weatherCache.index + '</div></li><li><div class="sunshine"></div><div>&nbsp;&nbsp;' + getI18nMsg('weatherUVIndex') + ': ' + weatherCache.index_uv + '</div></li><li><div class="car"></div><div>&nbsp;&nbsp;' + getI18nMsg('weatherCarWashIndex') + ': ' + weatherCache.index_xc + '</div></li><li><div class="foot"></div><div>&nbsp;&nbsp;' + getI18nMsg('weatherTravelIndex') + ': ' + weatherCache.index_tr + '</div></li><li><div class="injection"></div><div>&nbsp;&nbsp;' + getI18nMsg('weatherAllergyIndex') + ': ' + weatherCache.index_ag + '</div></li></ul></div></div><div class="weatherForecast">' + weatherForecast + '</div><div class="citySettingContainer"><div class="cityIndex"><div class="cityIndexItem selected">All</div><div class="cityIndexItem">A</div><div class="cityIndexItem">B</div><div class="cityIndexItem">C</div><div class="cityIndexItem">D</div><div class="cityIndexItem">F</div><div class="cityIndexItem">G</div><div class="cityIndexItem">H</div><div class="cityIndexItem">J</div><div class="cityIndexItem">L</div><div class="cityIndexItem">N</div><div class="cityIndexItem">Q</div><div class="cityIndexItem">S</div><div class="cityIndexItem">T</div><div class="cityIndexItem">X</div><div class="cityIndexItem">Y</div><div class="cityIndexItem">Z</div></div><div class="cityList"></div></div></div></div>';
            template = $(template);
            template.find('.weatherAbstract').unbind('click').bind('click', function () {
                var weatherDetailBG = '0';
                var imgNo = ($(this).attr('index') - 1) * 2 + 1;
                $.each(self.imageOptions["1:1"], function (i, n) {
                    if (n.indexOf(1 * weatherCache['img' + imgNo]) > -1) {
                        weatherDetailBG = self.bgImageOptions[i];
                        return false
                    }
                });
                template.find('.weatherDetail').css("backgroundImage", 'url(' + urlImg + 'myapp/weather/img/bg/t01_' + weatherDetailBG + '.jpg)');
                var selectWeatherDate = curWeatherDate + (parseInt($(this).attr('index') - 1)) * 3600 * 24 * 1000;
                selectWeatherDate = new Date(selectWeatherDate);
                var weatherSketchHtml = '<div>' + weatherCache['temp' + $(this).attr('index')].replace(/℃/g, "°") + '</div><div>' + weatherCache['weather' + $(this).attr('index')] + '</div><div>' + weatherCache['wind' + $(this).attr('index')] + '</div><div class="line"></div><div>' + selectWeatherDate.getFullYear() + getI18nMsg('yearUnit') + (selectWeatherDate.getMonth() + 1) + getI18nMsg('monthUnit') + selectWeatherDate.getDate() + getI18nMsg('dateUnit') + '&nbsp;' + self.weekOptions[selectWeatherDate.getDay()] + '</div>';
                if ($(this).attr('index') > 1) {
                    template.find('.weatherAbout').hide()
                } else {
                    weatherSketchHtml += '<div>' + PDI.get("setup", "lunarCalendar") + (PDI.get("setup", "ip") == '' ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;(IP:' + PDI.get("setup", "ip") + ')') + '</div>';
                    template.find('.weatherAbout').show()
                }
                template.find('.weatherSketch').html(weatherSketchHtml)
            });
            template.find('.cityIndexItem').unbind('click').bind('click', function () {
                if ($(this).text() != 'All') {
                    template.find('.cityItems').hide();
                    template.find('.cityItems[index=' + $(this).text() + ']').show()
                } else {
                    template.find('.cityItems').show()
                }
                template.find('.cityIndexItem').removeClass('selected');
                $(this).addClass('selected')
            });
            template.find('.citySetting').unbind('click').bind('click', function () {
                if (template.find('.citySettingContainer').css("display") == 'none') {
                    if (self.cityCache == '') {
                        $.get(urlImg + "myapp/weather/city/" + ui_locale + ".json", function (data) {
                            if (data) {
                                self.cityCache += '<ul class="cityItems">' + getI18nMsg('weatherSelectCity') + '<li><div class="cityItem" cityID="">' + getI18nMsg('auto') + '</div></li></ul>';
                                var data = JSON.parse(data);
                                $.each(data, function (i, n) {
                                    self.cityCache += '<ul class="cityItems" index="' + n.p + '">' + i + '<li>';
                                    $.each(n.data, function (k, v) {
                                        self.cityCache += '<div class="cityItem" cityID="' + k + '">' + v + '</div>'
                                    });
                                    self.cityCache += '</li></ul>'
                                });
                                template.find('.cityList').empty().append(self.cityCache);
                                template.find('.cityItem').unbind('click').bind('click', function () {
                                    template.find('.citySettingContainer').hide();
                                    self.reloadWeather($(this).attr("cityID"), targetDialogObj)
                                });
                                template.find('.citySettingContainer').show()
                            }
                        })
                    } else {
                        template.find('.cityList').empty().append(self.cityCache);
                        template.find('.cityItem').unbind('click').bind('click', function () {
                            template.find('.citySettingContainer').hide();
                            self.reloadWeather($(this).attr("cityID"), targetDialogObj)
                        });
                        template.find('.citySettingContainer').show()
                    }
                } else {
                    template.find('.citySettingContainer').hide()
                }
            });
            template.unbind('click').bind('click', function (e) {
                if (!$(e.target).hasClass('citySetting')) {
                    if (template.find('.citySettingContainer').css("display") != 'none' && !isContains(e.target, template.find('.citySettingContainer').get(0))) {
                        template.find('.citySettingContainer').hide()
                    }
                }
            });
            targetDialogObj.changeContent(template)
        }, reloadWeather: function (cityID, targetDialogObj) {
            var self = this;
            if (cityID != "") {
                self.cityID = cityID;
                self.dateline = 0;
                self.isAuto = false;
                PDI.set('weather', '', {cityID: self.cityID, isAuto: self.isAuto, tempUnit: self.tempUnit, dateline: self.dateline});
                self.getWeather(function () {
                    self.getWeatherData(function (data) {
                        try {
                            var weahterInfo = JSON.parse(data);
                            self.weatherCache = weahterInfo.weatherinfo;
                            setTimeout(function () {
                                self.template(targetDialogObj, self.weatherCache)
                            }, 500)
                        } catch (e) {
                            showNotice(getI18nMsg('weatherCityDataNull'));
                            self.reloadWeather(self.defaultCityID, targetDialogObj)
                        }
                    })
                })
            } else {
                var t = new Date().getTime();
                $.ajax({url: urlImg + "myapp/weather/city/global/getAddress.php?t=" + t, success: function (result) {
                    var result = JSON.parse(result);
                    if (typeof result == 'object' && result.city) {
                        $.ajax({url: urlImg + "tianqi/city.php?city=" + result.city + "&t=" + t, success: function (data) {
                            if (typeof data == 'string' && data.substr(0, 5) != 'ERROR') {
                                self.cityID = data;
                                self.dateline = 0;
                                self.isAuto = true;
                                PDI.set('weather', '', {cityID: self.cityID, isAuto: self.isAuto, tempUnit: self.tempUnit, dateline: self.dateline});
                                self.getWeather(function () {
                                    self.getWeatherData(function (data) {
                                        try {
                                            var weahterInfo = JSON.parse(data);
                                            self.weatherCache = weahterInfo.weatherinfo;
                                            setTimeout(function () {
                                                self.template(targetDialogObj, self.weatherCache)
                                            }, 500)
                                        } catch (e) {
                                            showNotice(getI18nMsg('weatherCityDataNull'));
                                            self.reloadWeather(self.defaultCityID, targetDialogObj)
                                        }
                                    })
                                })
                            }
                        }})
                    } else {
                        showNotice(getI18nMsg('weatherCityIsNull'))
                    }
                }})
            }
        }};
        return weather
    })()
})(jq);
var weather = $.weather();