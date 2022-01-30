const getDataCovid = async () => {
    try {
        const req = await fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json");
        const res = await req.json();        

        return res;
    } catch (error) {
        console.log(error);
    }
}

export {
    getDataCovid
}