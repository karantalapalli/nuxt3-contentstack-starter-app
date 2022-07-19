<template>
  <div>
    <Head>
      <Title>{{ response.title }}</Title>
      <Meta 
        :title="response.seo.meta_title"
        :name="response.seo.meta_title"
        :description="response.seo.meta_description"
        :keywords="response.seo.keywords"
      />
    </Head>
    <main>
      <BlogBanner :data="bannerData.page_components[0].hero_banner" />
      <div
        class="blog-container"
        :data-pageref="response.uid"
        data-contenttype="blog_post"
        :data-locale="response.locale"
      >
        <div class="blog-detail">
          <h2>{{ response.title }}</h2>
          <span>
            {{ BlogDate(response.date) }}, 
            <strong>{{ response.author[0].title }}</strong>
          </span>
          <p v-html="response.body" />
        </div>
        <div v-if="response" class="blog-column-right">
          <div class="related-post">
            <h2>{{ bannerData.page_components[2].widget.title_h2 }}</h2>
            <template :key="index" v-for="(blog, index) in response.related_post">
              <div>
                <NuxtLink :key="index" :to="blog.url">
                  <h4>{{ blog.title }}</h4>
                </NuxtLink>
                <!-- <p v-html="blog.body.slice(0, 80)" /> -->
              </div>
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">

import moment from 'moment'
import Stack, { onEntryChange } from '../../plugins/contentstack'
import Data from '@/typescript/pages'

const route = useRoute()
const response = useState('response', () => {})
const bannerData = useState('banner', () => {})

useAsyncData('getPageData', async () => {
  try {
    const banner = await Stack.getEntryByUrl({
      contentTypeUid: 'page',
        entryUrl: `/blog`,
      })
      bannerData.value = banner[0];

      const data = await Stack.getEntryByUrl({
        contentTypeUid: 'blog_post',
        entryUrl: `${route.fullPath}`,
        referenceFieldPath: [`related_post`, `author`],
        jsonRtePath: ['body', 'related_post.body'],
      })
      response.value = data[0];
      
      return {
        bannerData,
        response
      }
    } catch (e) {
      return false
    }
})

onMounted(() => {
  onEntryChange(async () => {
    if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
      const res = await fetchData()
      response.value = res
    }
  })
})

const fetchData = async () => {
  try {
    const data: [Data] = await Stack.getEntryByUrl({
      contentTypeUid: 'blog_post',
      entryUrl: `${route.fullPath}`,
      referenceFieldPath: [`related_post`, `author`],
      jsonRtePath: ['body', 'related_post.body'],
    })
    const element: HTMLCollection = document.getElementsByClassName('cslp-tooltip')
    if (element.length > 0) {
      element[0].outerHTML = ''
    }
    return {
      data: data[0],
    }
  } catch (e) {
    return false
  }
}

const BlogDate = (param: string) => {
  return moment(param).format('ddd, MMM D YYYY');
}
</script>
