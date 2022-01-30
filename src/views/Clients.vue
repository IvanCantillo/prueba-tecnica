<template>
  <div>
      <div class="row my-2">
          <div class="col-3 text-right">
              <h2>Clientes</h2>                
          </div> 
          <div class="col-12 col-sm-8 col-md-5 col-lg-2 col-xl-2 d-flex align-content-center">                      
              <button 
                class="btn btn-block rounded-pill bg-color text-white"
                @click="addOrEditClient(true, client)"                
                data-toggle="modal" data-target="#modal-add-or-edit-client"     
              >            
                Agregar cliente
              </button>
          </div>            
      </div>
      <div class="row">
          <div class="col-12 col-md-10 col-lg-8 mx-auto table-container">                               
              <table class="table table-borderless w-100">
                  <thead>
                      <tr>
                          <th style="width: 0px"></th>
                          <th class="text-center">Nombre</th>
                          <th class="text-center">Apellido</th>
                          <th style="width: 0px" class="text-center">Correo</th>
                      </tr>
                  </thead>    
                  <tbody v-if="clients.length > 0">
                    <template v-for="client in clients"> 
                      <tr class="hover" :key="client.id" @click="toggleMoreInfo(client)">
                          <th>
                              <button                                             
                                  class="btn btn-sm text-white btn-warning rounded-circle font-weight-bold py-1"
                              >
                                  <i  :class="`fas fa-chevron-${client.moreInfo ? 'down' : 'up'}`"></i>
                              </button>
                          </th>
                          <td>{{ client.name }}</td>
                          <td>{{ client.lastName }}</td>
                          <td class="text-center">{{ client.email }}</td>
                      </tr>   
                      <template v-if="client.moreInfo == true">
                        <tr :key="client.id + '-1'">
                          <td colspan="2" class="text-left">
                              <strong>Teléfono:</strong> {{ client.phone }}
                          </td>          
                          <td colspan="2" class="text-left">
                              <strong>Cumpleaños:</strong> {{ client.deteOfBirth }}
                          </td>                                
                        </tr>   
                        <tr :key="client.id  + '-2'">
                          <td colspan="2" class="text-left">
                              <strong>País:</strong> {{ client.country }}
                          </td>
                          <td colspan="2" class="text-left">
                              <strong>Género:</strong> {{ client.gender }}
                          </td>
                        </tr>   
                        <tr :key="client.id  + '-3'">
                          <td colspan="2" class="text-left">
                              <strong>Ciudad:</strong> {{ client.city }}
                          </td>
                          <td colspan="2" class="text-left">
                              <strong>Hijos:</strong> {{ client.children ? client.numberOfChildren : 'Sin hijos' }}
                          </td>
                        </tr>    
                        <tr :key="client.id  + '-4'">
                          <td colspan="2" class="text-left">
                              <strong class="pr-2">Opciones:</strong>

                              <button 
                                  @click="deleteClient(client)"
                                  class="btn btn-sm btn-danger rounded-circle mr-2"
                                  :title="`Eliminar a ${client.name} ${client.lastName}`"
                              >
                                  <i class="far fa-trash-alt"></i>
                              </button>
                              <button 
                                class="btn btn-sm bg-ligth-color rounded-circle"
                                @click="addOrEditClient(false, client)"                
                                data-toggle="modal" data-target="#modal-add-or-edit-client"     
                              >            
                                <i class="fas fa-pencil-alt"></i>
                            </button>                                           
                          </td>                                    
                        </tr>                                                                              
                      </template>
                    </template>
                  </tbody>       
                  <tbody v-else>
                      <td class="text-center" colspan="4">No hay clientes registrados.</td>
                  </tbody>     
              </table>
          </div>
      </div>   
      <px-modal-add-or-edit-client 
        :client="dataClient" 
        :is-add-client="isAddClient"
        v-on:create-or-save-client="createOrSaveClient"
    ></px-modal-add-or-edit-client>
  </div>
</template>

<script>

import PxModalAddOrEditClient from "@/components/PxModalAddOrEditClient";

export default {
    name: "Clients",
    components: { PxModalAddOrEditClient },    
    data: function () {
      return {
        isAddClient: true,
        clients: [],
        client: {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            deteOfBirth: '',
            gender: '',
            children: false,
            numberOfChildren: 0,       
        },
        dataClient: {}
      }
    },
    created() {
        this.clients = JSON.parse(localStorage.getItem('clients')) || [];
    },
    methods: {
        addClient(client) {      
            this.clients.push({
                id: new Date().getTime(),     
                moreInfo: false, 
                ...client      
            });
            localStorage.setItem('clients', JSON.stringify(this.clients));   
        },
        editClient(client){
            this.clients = this.clients.map( c => c.id == client.id ? client : c);                            
            localStorage.setItem('clients', JSON.stringify(this.clients));   
        },
        deleteClient(client) {
            this.$swal({
                title: '¿Estás seguro de que deseas eliminar a este cliente?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si, eliminar',
                cancelButtonText: '<i class="fa fa-thumbs-down"></i> No',
                confirmButtonColor: '#6c757d',
                cancelButtonColor: '#6236FF',
            }).then((res) => {
                if(res.isConfirmed) {
                    this.clients = this.clients.filter( c => c.id != client.id );
                    localStorage.setItem('clients', JSON.stringify(this.clients)); 
                }
            })            
        },
        addOrEditClient( isAddClient, client) {
            this.isAddClient = isAddClient;
            this.dataClient = {...client};
        },
        createOrSaveClient(client, isAddClient) {
            
            if(isAddClient) {
                this.addClient(client);
            }else {
                this.editClient(client);
            }
        },
        toggleMoreInfo(client) {
            client.moreInfo = !client.moreInfo;
            localStorage.setItem('clients', JSON.stringify(this.clients)); 
        }
    },
}
</script>

<style>
.cursor {
    cursor: pointer;
}

.hover:hover {
    cursor: pointer;
    background-color: rgba(128, 128, 128, 0.055);
}

.table-container {
    max-height: 30rem;
    overflow-y: auto;
}

.bg-color {
    background-color: #6236FF;
}

.bg-ligth-color {
    background-color: #DCD4F9;
}

/* SCROLLS*/
.table-container::-webkit-scrollbar {
    width: 6px;     /* Tamaño del scroll en vertical */
    height: 6px;    /* Tamaño del scroll en horizontal */
}

/* Ponemos un color de fondo y redondeamos las esquinas del thumb */
.table-container::-webkit-scrollbar-thumb {
    background: rgb(172, 170, 170);
    border-radius: 4px;
}

/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
.table-container::-webkit-scrollbar-thumb:hover {
    background: #858585;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    padding: 10px;
}

/* Cambiamos el fondo cuando esté en active */
.table-container::-webkit-scrollbar-thumb:active {
    background: #858585;
}

/* Ponemos un color de fondo y redondeamos las esquinas del track */
.table-container::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 4px;
    width: 30px;
    height: 30px;
}
</style>