<template>
  <footer>
    <div class="max-width footer-div">
      <div class="col-quarter">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="response.title"
          to="/"
        >
          <img
            class="logo"
            :src="response.logo.url"
            :alt="response.title"
          />
        </NuxtLink>
      </div>
      <div class="col-half">
        <nav>
          <ul class="nav-ul">
            <li
              v-for="navItems in response.navigation.link"
              :key="navItems.title"
              class="footer-nav-li"
            >
              <NuxtLink :to="navItems.href">
                {{ navItems.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-quarter social-link">
        <div class="social-nav">
          <template :key="index.title" v-for="index in response.social.social_share">
            <NuxtLink        
              :to="index.link.href"
              :title="index.title"
            >
              <img :src="index.icon.url" :alt="index.icon.title" />
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
    <div class="copyright" v-html="response.copyright" />
  </footer>
</template>

<script setup lang="ts">
import Stack, { onEntryChange } from '../plugins/contentstack';
import Links from '../typescript/data'

interface PageResponse {
  title: string;
  url: string;
}

const response = useState('response', () => {})

useAsyncData('getFooter', async () => {
  const result = await Stack.getEntries({
      contentTypeUid: 'footer',
      jsonRtePath: ['copyright'],
    })
    const responsePages: [PageResponse] = await Stack.getEntries({
      contentTypeUid: 'page',
    })
    const navFooterList = result[0].navigation.link
    if (responsePages.length !== result.length) {
      responsePages.forEach((entry) => {
        const fFound = result[0].navigation.link.find(
          (link: Links) => link.title === entry.title
        )
        if (!fFound) {
          navFooterList.push({ title: entry.title, href: entry.url })
        }
      })
    }
    result[0].navigation.link = navFooterList
    response.value = result[0]
    return response;
})

onMounted(() => {
  onEntryChange(async () => {
    if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
      const response = await fetchData()
    }
  })
})

const fetchData = async () => {
  const result = await Stack.getEntries({
    contentTypeUid: 'footer',
    jsonRtePath: ['copyright']
  })
  const responsePages: [PageResponse] = await Stack.getEntries({
    contentTypeUid: 'page'
  })
  const navFooterList = result[0].navigation.link
  if (responsePages.length !== result.length) {
    responsePages.forEach((entry) => {
      const fFound = result[0].navigation.link.find(
        (link: Links) => link.title === entry.title
      )
      if (!fFound) {
        navFooterList.push({ title: entry.title, href: entry.url })
      }
    })
  }
  result[0].navigation.link = navFooterList
  return result
}
</script>
