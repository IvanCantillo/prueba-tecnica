<template>
    <div class="modal fade" id="modal-add-or-edit-client" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="modal-add-user" aria-hidden="true">
        <div class="modal-dialog modal-dialog modal-dialog-scrollable modal-xl">
            <form>                
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span v-if="isAddClient"> Agregar usuario </span>
                            <span v-else> Editar usuario </span>                    
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-lg-4">
                                <div class="form-group">
                                    <label for="">Nombre</label>
                                    <input required type="text" class="form-control" id="" ref="name" v-model="client.name" placeholder="Ingresa tú nombre">
                                </div>
                            </div>
                            <div class="col-12 col-lg-4">
                                <div class="form-group">
                                    <label for="">Apellido</label>
                                    <input required type="text" class="form-control" id="" ref="lastName" v-model="client.lastName" placeholder="Ingresa tú apellido">
                                </div>
                            </div>
                            <div class="col-12 col-lg-4">
                                <div class="form-group">
                                    <label for="">Teléfono</label>
                                    <input required type="number" class="form-control" id="" ref="phone" v-model="client.phone" placeholder="Ingresa tú teléfono">
                                </div>
                            </div>                            
                        </div>  
                        <div class="row">      
                            <div class="col-12 col-lg-4">
                                <div class="form-group">
                                    <label for="">Correo</label>
                                    <input required type="email" class="form-control" id="" ref="email" v-model="client.email" placeholder="Ingresa tú correo">
                                </div>
                            </div>                       
                            <div class="col-12 col-lg-4">
                                <div class="form-group">
                                    <label for="">País</label>
                                    <input required type="text" class="form-control" id="" ref="country" v-model="client.country" placeholder="¿De qué país eres?">
                                </div>
                            </div>
                            <div class="col-12 col-lg-4">
                                <div class="form-group">
                                    <label for="">Ciudad</label>
                                    <input required type="text" class="form-control" id="" ref="city" v-model="client.city" placeholder="¿De qué ciudad eres?">
                                </div>
                            </div>                                                                                  
                        </div>  
                        <div class="row">
                            <div class="col-12 col-lg-3">
                                <div class="form-group">
                                    <label for="">¿Cuándo naciste?</label>
                                    <input required type="date" class="form-control" id="" ref="deteOfBirth" v-model="client.deteOfBirth" placeholder="Ingresa tú correo">
                                </div>
                            </div> 
                            <div class="col-12 col-lg-4">
                                <div class="form-group">
                                    <label for="">¿Con que genero te identificas?</label>
                                    <select ref="gender" v-model="client.gender" class="form-control">
                                        <option value="">Selecciona un genero</option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                        <option value="">Prefiero no decirlo</option>
                                    </select>
                                </div>
                            </div>                            
                            <div class="col-12 col-lg-2">
                                <div class="form-group">
                                    <label for="">¿Tienes hijos?</label>
                                    <select 
                                        ref="children" v-model="client.children" 
                                        class="form-control"
                                        @change="client.children == 'false' ? client.numberOfChildren = 0 : 0"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="true">Si</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-lg-3">
                                <div class="form-group">
                                    <label for="">¿Cuantos hijos tienes?</label>
                                    <input 
                                        type="number"
                                        class="form-control" 
                                        ref="numberOfChildren" v-model="client.numberOfChildren" 
                                        :disabled="client.children == 'true' ? false : true" 
                                        placeholder="Ingresa tu apellido"
                                    />
                                </div>
                            </div>
                        </div>                      
                    </div>
                    <div class="modal-footer">
                        <button 
                            type="submit" 
                            class="btn bg-color text-white"
                            @click.prevent="createOrSaveClient"                            
                        >
                            <i class="fas fa-save"></i>
                            {{ isAddClient ? " Crear usuario" : " Guardar" }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "PxModalAddOrEditClient",
    props: {
        client: {
            type: Object,
        },
        isAddClient: Boolean
    },
    methods: {
        validateInputs() {
            let error = false;

            if(this.client.name == ''){
                error = true;
                this.$swal({
                    title: 'Debes ingresar tú nombre, por favor.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#6236FF',
                }).then(() => this.$refs.name.focus()); 
            }else if( this.client.lastName == '' ){
                error = true;
                this.$swal({
                    title: '¿Cómo es tu apellido?',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#6236FF',
                }).then(() => this.$refs.lastName.focus()); 
            }else if( this.client.phone == '' ){
                error = true;       
                this.$swal({
                    title: '¿Nos puedes dar tu teléfono?',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#6236FF',
                }).then(() => this.$refs.phone.focus());          
            }else if( this.client.email == '' ){
                error = true;  
                this.$swal({
                    title: 'Necesitamos tu correo electrónico.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#6236FF',
                }).then(() => this.$refs.email.focus());               
            }else if( this.client.country == '' ){
                error = true;    
                this.$swal({
                    title: '¿De qué país eres? No nos lo has dicho.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#6236FF',
                }).then(() => this.$refs.country.focus());             
            }else if( this.client.city == '' ){
                error = true;  
                this.$swal({
                    title: 'Necesitamos saber en que ciudad naciste.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#6236FF',
                }).then(() => this.$refs.city.focus());               
            }else if( this.client.deteOfBirth == '' ){
                error = true;
                this.$swal({
                    title: '¿Y tú fecha de nacimiento?',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#6236FF',
                }).then(() => this.$refs.deteOfBirth.focus()); 
            }

            return error;
        },
        createOrSaveClient() {
            if(!this.validateInputs()){
                this.$emit('create-or-save-client', this.client, this.isAddClient );
                this.$refs.closeModal.click();
            }
        }
    }
}
</script>

<style>

</style>