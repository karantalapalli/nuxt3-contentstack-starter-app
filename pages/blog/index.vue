<template>
  <div>
    <Head>
      <Title>{{ response.title }}</Title>
      <Meta 
        :title="response.seo.meta_title"
        :name="response.seo.meta_description"
        :description="response.seo.meta_description"
        :keywords="response.seo.keywords"
      />
    </Head>
    <main v-show="response">
      <BlogBanner :data="response.page_components[0].hero_banner" />
      <div
        class="blog-container"
        :data-pageref="response.uid"
        data-contenttype="page"
        :data-locale="response.locale"
      >
        <div class="blog-column-left">
          <template :key="index" v-for="(list, index) in recent">
            <div class="blog-list">
              <NuxtLink :to="list.url">
                <img
                  alt="blog img"
                  class="blog-list-img"
                  :src="list.featured_image.url"
                />
              </NuxtLink>
              <div class="blog-content">
                <NuxtLink :to="list.url">
                  <h3>{{ list.title }}</h3>
                </NuxtLink>
                <p>
                  {{ BlogDate(list.date) }},
                  <strong>{{ list.author[0].title }}</strong>
                </p>
                <!-- <p v-html="list.body.slice(0, 250)" /> -->
                <NuxtLink :to="list.url">
                  <span>Read more --&gt;</span>
                </NuxtLink>
              </div>
            </div> 
          </template>
        </div>
        <div class="blog-column-right">
          <h2>{{ response.page_components[1].widget.title_h2 }}</h2>
          <template :key="index" v-for="(component, index) in archive">
            <NuxtLink :to="component.url">
              <div>
                <h4>{{ component.title }}</h4>
                <!-- <p v-html="component.body.slice(0, 80)" /> -->
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">

import moment from 'moment'
import Stack,{ onEntryChange } from '../../plugins/contentstack'
import Data from '@/typescript/pages'

interface List {
    author: [];
    body: string;
    date: string;
    featured_image:object;
    is_archived: boolean;
    related_post:[];
    locale: string;
    seo: object;
    title: string;
    url: string;
}

const route = useRoute()
const response = useState('response', () => {})
const archive = useState('archive', () => {})
const recent = useState('recent', () => {})


useAsyncData('getPageData', async () => {
    const archivedList = [] as any
    const recentBlog = [] as any
    const data = await Stack.getEntryByUrl({
      contentTypeUid: 'page',
      entryUrl: `${route.fullPath}`,
    })
    const list: [List] = await Stack.getEntries({
      contentTypeUid: 'blog_post',
      referenceFieldPath: [`author`, `related_post`],
      jsonRtePath: ['body'],
    })
    list.forEach((item) => {
      if (item.is_archived) {
        archivedList.push(item)
      } else {
        recentBlog.push(item)
      }
    })
    
    response.value = data[0]
    archive.value = archivedList
    recent.value = recentBlog
    
    return {
      response,
      archive,
      recent,
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
      contentTypeUid: 'page',
      entryUrl: `${route.fullPath}`,
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