<template>
  <div>
    <bounce-loader
      class="mt-4 mx-auto"
      :loading="isLoading"
      :color="'#6236FF'"
    />
    <div v-if="!isLoading">
      <div class="row my-2">
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 text-right d-flex justify-content-center align-items-center ml-auto mb-2">
          <span class="mr-2"> Cambiar pais: </span>
          <select v-model="country" @change="changeCountry" class="form-control w-50">
            <option v-for=" c in countrys " :key="c.key" :value="c.key">
              {{ c.value }}
            </option>
          </select>
        </div>
        <div class="col-12 text-center">
          <h4>Historial de COVID-19 en {{ data.location }}</h4>  
          <span class="text-secondary"> Ultima atualización: {{ data.last_updated_date }} </span>              
          <p>
            <strong>{{ data.location }}</strong> cuenta con una población de {{ new Intl.NumberFormat('COP').format(data.population) }} habitantes donde se han aplicado {{ new Intl.NumberFormat('COP').format(data.total_vaccinations) }} vacunas.
            No obstante, existe un registro de {{ new Intl.NumberFormat('COP').format(data.total_deaths) }} muertes tras la pandemia.
          </p>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <h5> - Muertes y nuevos casos: </h5>
        </div>
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto my-4">
          <column-chart 
            :data="dataCharts.cases"
            :download="{background: '#fff'}"
            :messages="{empty: 'Sin datos'}"
            :colors="['#6236FF']"
          >
          </column-chart>
        </div>
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto my-4">
          <column-chart 
            :data="dataCharts.deaths"
            :download="{background: '#fff'}"
            :messages="{empty: 'Sin datos'}"
            :colors="['#6236FF']"
          >
          </column-chart>
        </div>
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto my-4">
          <column-chart 
            :data="dataCharts.totalCasesAndDeaths"
            :download="{background: '#fff'}"
            :messages="{empty: 'Sin datos'}"
            :colors="['#6236FF']"
          >
          </column-chart>
        </div>
      </div>   
      <div class="row">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl- my-4">
          <h5> - Pruebas realizadas: </h5>
          <bar-chart 
            :data="dataCharts.tests"
            :download="{background: '#fff'}"
            :messages="{empty: 'Sin datos'}"
            :colors="['#6236FF']"
          >
          </bar-chart>
        </div>
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl- my-4">
          <h5> - Vacunas aplicadas: </h5>
          <bar-chart 
            :data="dataCharts.vaccionations"
            :download="{background: '#fff'}"
            :messages="{empty: 'Sin datos'}"
            :colors="['#6236FF']"
          >
          </bar-chart>
        </div>
      </div>    
    </div>
  </div>
</template>

<script>

import * as Api from "@/services/Api.js";

export default {
    name: "CovidHistory",
    data: function () {
      return {
        data: {},
        countrys: [],
        country: 'COL',
        dataCharts: {
          cases: [],
          deaths: [],
          totalCasesAndDeaths: [],
          tests: [],
          vaccionations: []
        },
        isLoading: false
      }
    },
    created() {
      this.getData();
    },

    methods: {
      async getData() {    
        this.isLoading = true;
        const res = await Api.getDataCovid();
        this.countrys = [];
        for (const [key, value] of Object.entries(res)) {
            this.countrys.push({key, value: value.location});
        }
        this.data = res[this.country];
        this.isLoading = false;
        
        this.dataCharts.cases = [['Nuevos casos', this.data.new_cases], ['Nuevos casos por millon de personas', this.data.new_cases_per_million]];
        this.dataCharts.deaths = [['Muertes recientes', this.data.new_deaths], ['Muertes recientes por millon de personas', this.data.new_deaths_per_million]];
        this.dataCharts.totalCasesAndDeaths = [['Total casos', this.data.total_cases], ['Total casos por millon de personas', this.data.total_cases_per_million], ['Total muertes', this.data.total_deaths], ['Total muertes por millon de personas', this.data.total_deaths_per_million]];
        this.dataCharts.tests = [['Pruebas recientes', this.data.new_tests], ['Total de pruebas aplicadas', this.data.total_tests]];
        this.dataCharts.vaccionations = [['Personas vacunadas', this.data.people_vaccinated], ['Total de vacunas aplicadas', this.data.total_vaccinations]];
      }, 

      changeCountry() {
        this.getData();
      }
    }
}
</script>

<style>

</style>