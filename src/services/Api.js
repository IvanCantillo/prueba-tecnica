const getDataCovid = async (country = 'COL') => {
    try {
        const req = await fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json");
        const res = await req.json();

        return res[country];
    } catch (error) {
        console.log(error);
    }
}

const getCountrys = async () => {
    try {
        const req = await fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json");
        const res = await req.json();

        const data = [];

        for (const [key, value] of Object.entries(res)) {
            data.push({key, value: value.location});
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

export {
    getDataCovid,
    getCountrys
}