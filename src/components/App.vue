<template>
  <Page>
    <ActionBar title="Shopify API in NativeScript-Vue!" />
    <GridLayout columns="*" rows="*">
      <ActivityIndicator
        row="0"
        :busy="loading"
        :visibility="!loading ? 'collapse' : 'visible'"
        verticalAlignment="top"
      />
      <ListView for="item in products" row="0">
        <v-template>
          <CardProduct :p_product="item" />
        </v-template>
      </ListView>

      <Fab @tap="add" row="0" rippleColor="#f1f1f1" class="fab-button fa">{{
        "fa-plus" | fonticon
      }}</Fab>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CardProduct from "@/components/partials/CardProduct.vue";
import { prompt } from "@nativescript/core/ui/dialogs";
import * as Toast from "nativescript-toast";

@Component({
  components: {
    CardProduct,
  },
  filters: {},
})
export default class App extends Vue {
  loading = false;

  mounted() {
    let vm = this;
    vm.loading = true;
    this.$store.dispatch("shopifyProducts/load").then(function () {
      vm.loading = false;
    });
  }

  get products() {
    return this.$store.getters["shopifyProducts/getProducts"];
  }
  
  add(){
    let vm = this;
    prompt("Add product").then((result) => {
      if (result.result) {
        this.$store
          .dispatch("shopifyProducts/addProductTittle", {
            title: result.text,
          })
          .then(function (data) {
            var toast = Toast.makeText("Added successfully");
            toast.show();
          })
          .catch(function (data) {
            var toast = Toast.makeText("Error");
            toast.show();
          });
      }
    });
  }

}
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}
</style>
