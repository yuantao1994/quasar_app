<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">Field components</p>
      <q-field :count="10" helper="Some helper">
        <q-input v-model="text"/>
      </q-field>

      <q-field icon="wifi" :count="10" helper="Some helper">
        <q-input v-model="text" float-label="Input float label"/>
      </q-field>

      <q-field icon="wifi" icon-color="amber" label="Field label" helper="Some helper">
        <q-input v-model="email" type="email" suffix="@email.com"/>
      </q-field>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      email: ''
    }
  },
  methods: {}
}
</script>