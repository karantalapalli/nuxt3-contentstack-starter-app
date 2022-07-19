<template>
  <div>
  <Head v-if="response">
    <Title>{{ response.title }}</Title>
    <Meta 
      :title="response.seo.meta_title"
      :name="response.seo.meta_title"
      :description="response.seo.meta_title"
      :keywords="response.seo.keywords"
    />
  </Head>
  <RenderComponents
    v-if="response"
    :components="response.page_components"
    :page="response.title"
    :entry-uid="response.uid"
    :locale="response.locale"
  />
  <PageNotFound v-else />
  </div>
</template>

<script setup lang="ts">
import Stack, { onEntryChange } from '../plugins/contentstack';

const route = useRoute()
const response = useState('response', () => {})

useAsyncData('getPageData', async() => {

  const data = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl: `${route.fullPath}`,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
    ],
  })
  response.value = data[0];
  return{
    response
  }
})

onMounted(() => {
  onEntryChange(async () => {
    if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
      const res = await fetchData()
      response.value = res[0]
    }
    return response
  })
})

const fetchData = async () => {  
  const result = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl: `${route.fullPath}`,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
    ],
  })
  const element: HTMLCollection = document.getElementsByClassName('cslp-tooltip')
  if (element.length > 0) {
    element[0].outerHTML = ''
  }
  return result
}
</script>
