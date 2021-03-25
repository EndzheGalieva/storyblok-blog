<template>
  <section id="about-page" v-editable="blok">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </section>
</template>

<script>
export default {
  asyncData (context) {
    return context.app.$storyapi
      .get('cdn/stories/about', {
        version: context.isDev ? 'draft' : 'published'
    })
      .then(res => {
      console.log(res.data)
      return {
        blok: res.data.story.content,
        title: res.data.story.content.title,
        content: res.data.story.content.content
      }
    })
  },
  mounted () {
    this.$storybridge.on(['input', 'published', 'change'], event => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content;
        }
      } else if (!event.slugChanged) {
        window.location.reload();
      }
    });
  }
 }
</script>

<style>
 #about-page {
   width: 80%;
   max-width: 500px;
   margin: auto;
 }

 #about-page {
   white-space: pre-line;
 }
</style>
