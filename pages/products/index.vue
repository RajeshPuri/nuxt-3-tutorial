<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="p in products">
      <ProductCard/>
      </div>
    </div>
  </div>
</template>

<script setup>
  //  fetch the products
// const { data: products } = await useFetch('https://fakestoreapi.com/products')

const products = ref(null);

(async () => {
  try {
     products.value = await $fetch('/api/product');
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})();



  definePageMeta({
    layout: "products", 
  })

  useHead({
    title: 'Nuxt Dojo | Merch',
    meta: [
      { name: 'description', content: 'Nuxt 3 Merch'}
    ]
  })
</script>