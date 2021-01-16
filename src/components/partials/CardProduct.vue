<template>
  <card-view margin="5" elevation="10" radius="1">
    <StackLayout>
      <label :text="p_product.title" class="h2"></label>
      <Image :src="imgSrc" stretch="aspectFit" />
      <HtmlView :html="p_product.body_html" />
      <StackLayout class="hr m-10"></StackLayout>
      <StackLayout orientation="horizontal">
        <Label
          @tap="delete_"
          horizontalAlignment="right"
          class="text-danger h3 fa"
          style="margin-left: 0"
          >{{ "fa-trash-o" | fonticon }} Delete</Label
        >
        <Label
          @tap="edit"
          horizontalAlignment="right"
          class="text-primary h3 fa"
          >{{ "fa-pencil-square-o" | fonticon }} Edit</Label
        >
      </StackLayout>
    </StackLayout>
  </card-view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../../store";
import { prompt, confirm } from "@nativescript/core/ui/dialogs";
import * as Toast from "nativescript-toast";

@Component({
  components: {},
  methods: {},
  filters: {},
})
export default class App extends Vue {
  //action!: any // <- for static type checking

  $refs!: {};

  @Prop() private p_product: {
    id: "";
    title: "";
    body_html: "";
  };
  imgSrc = "";
  mounted() {
    let vm = this;
    //vm.loading = true;
    store
      .dispatch("shopifyProducts/loadImageByProduct", this.p_product)
      .then(function (img) {
        vm.imgSrc = img;
      })
  }

  edit() {
    let vm = this;
    prompt("Edit title of the product", this.p_product.title).then((result) => {
      console.log('rs', result);
      if (result.result) {
        store
          .dispatch("shopifyProducts/updateTitleProduct", {
            id: vm.p_product.id,
            title: result.text,
          })
          .then(function (data) {
            var toast = Toast.makeText("Updated successfully");
            toast.show();
          })
          .catch(function (data) {
            var toast = Toast.makeText("Error");
            toast.show();
          });
      }
    });
  }

  delete_() {
    let vm = this;
    confirm("Delete?").then((result) => {
      if (result) {
        store
          .dispatch("shopifyProducts/deleteProduct", {
            id: vm.p_product.id,
          })
          .then(function (data) {
            var toast = Toast.makeText("Deleted successfully");
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
</style>
