// src/builders/WeatherRequestBuilder.ts
export class WeatherRequestBuilder {
  private params: Record<string, string | number> = {};

  constructor(q: string) {
    this.params['q'] = q;
  }

  setLang(lang: string) {
    if (lang) this.params['lang'] = lang;
    return this;
  }

  setDays(days: number) {
    if (days) this.params['days'] = days;
    return this;
  }

  setDt(dt: string) {
    if (dt) this.params['dt'] = dt;
    return this;
  }

  setUnixDt(unixdt: string) {
    if (unixdt) this.params['unixdt'] = unixdt;
    return this;
  }

  setAlerts(alerts: string) {
    if (alerts) this.params['alerts'] = alerts;
    return this;
  }

  setAqi(aqi: string) {
    if (aqi) this.params['aqi'] = aqi;
    return this;
  }

  setTp(tp: number) {
    if (tp) this.params['tp'] = tp;
    return this;
  }

  setHour(hour: number) {
    if (hour) this.params['hour'] = hour;
    return this;
  }

  build() {
    // Convertir todos los valores a string
    const stringifiedParams: Record<string, string> = Object.fromEntries(
      Object.entries(this.params).map(([key, value]) => [key, String(value)]),
    );

    return new URLSearchParams(stringifiedParams).toString();
  }
}
