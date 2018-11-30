
<template>
  <q-page>
    <q-list highlight>
      <q-list-header>Recent chats</q-list-header>
      <q-item @click.native="gotest()">
        <q-item-side>
          <q-item-tile avatar>
            <img src="statics/boy-avatar.png">
          </q-item-tile>
        </q-item-side>
        <q-item-main label="test page"/>
        <q-item-side right>
          <q-item-tile icon="chat_bubble" color="green"/>
        </q-item-side>
      </q-item>
      <q-item @click.native="gotest('input1')">
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="J=input "/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item @click.native="gotest()">
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item @click.native="gotest()">
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item @click.native="gotest()">
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item @click.native="gotest()">
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="go test"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png"/>
        <q-item-main label="Jim Doe"/>
        <q-item-side right icon="chat_bubble"/>
      </q-item>
      <q-item-separator/>
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png"/>
        <q-item-main label="Jack Doe"/>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    gotest(page) {
      if (!page) page = 'details-test'
      this.$router.push({ name: page })
    }
  }
}
</script>

<style>
</style>
