<template>
    <div class="container">
        <h1>Users</h1>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <!-- <form> -->
            <div class="mb-3">
                <label for="exampleInputName" class="form-label">Name</label>
                <input v-model="user.name" type="text" class="form-control" id="exampleInputName">
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <!-- <button type="submit"  @click.prevent="$event=>addUser(user)" class="btn btn-primary">Add User</button> -->
        <!-- </form> -->
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click.prevent="$event=>updateUser(user)" >Update</button>
      </div>
    </div>
  </div>
</div>


        <form>
            <div class="mb-3">
                <label for="exampleInputName" class="form-label">Name</label>
                <input v-model="user.name" type="text" class="form-control" id="exampleInputName">
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <button type="submit"  @click.prevent="$event=>addUser(user)" class="btn btn-primary">Add User</button>
        </form>

        <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">SN.</th>
                    <th scope="col">Name </th>
                    <th scope="col">Email</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in users">
                    <th scope="row">{{ index + 1}}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <button type="button" class="btn bg-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Update</button>
                    </td>
                    <td>
                        <button type="button" class="btn bg-danger btn-sm"  @click.prevent="$event=>deleteUser(user.id)"> Delete</button>
                    </td>
                    
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {ref} from "vue"
export default {
  setup() {
    const users = ref(null);
    const user = ref({
            name: null,
            email:null
    });
    
    (async () => {
      try {
        users.value = await $fetch('/api/user');
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    })();

    /**
     * @desc Add users 
     * @param user The user to add
     */

        async function addUser(user) {
            let addedUser=null

            if(user.name)
                addedUser = await $fetch('/api/user', {
                    method: 'POST',
                    body: {
                        name:user.name,
                        email:user.email
                    }
                });

            if (addedUser) {
                user.value = {
                    name: null,
                    email: null
                };
                
                
                users.value = await $fetch('/api/user');
            }
        }

    /**
     * @desc Delete user
     */

        async function deleteUser(id) {
            let deletedUserOrError = null
            
            if (id)
                deletedUserOrError = await $fetch('/api/user', {
                    method: 'DELETE',
                    body: {
                        id: id,
                    }
                });

            // if (deletedUserOrError instanceof H3Error) {
            //     console.log('Error deleting User')
            //     return
            // }
            users.value = await $fetch('/api/user');
        }

        /**
         * @desc Update user 
         */

        async function updateUser(user) {
            let updatedUser = null

            if (user.id && user.name)
                updatedUser = await $fetch('/api/user', {
                    method: 'PUT',
                    body: {
                        id:user.id,
                        name:user.name,
                        email:user.email
                    }

                })

            if(user.id)users.value=await $fetch('/api/user')  
        }




    useHead({
    title:"nuxt with prisma",
    link: {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        type: "text/css"
    },
    script: {
        src:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    }
})

    return {users,user,addUser,deleteUser,updateUser}
  }
}
</script>

