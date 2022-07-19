<template>
  <header class="header">
    <template v-if="response.notification_bar.show_announcement">
      <div class="note-div">
        <span v-html="response.notification_bar.announcement_text" />
      </div>
    </template>
    <div class="max-width header-div">
      <div class="wrapper-logo">
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
      <input id="menu-btn" type="checkbox" class="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon" />
      </label>
      <nav class="menu">
        <ul class="nav-ul header-ul">
          <li
            v-for="navItems in response.navigation_menu"
            :key="navItems.title"
            class="nav-li"
          >
            <NuxtLink :to="navItems.page_reference[0].url">
              {{ navItems.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="json-preview">
        <Tooltip content="JSON Preview" direction="top"></Tooltip>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Stack,{ onEntryChange } from '../plugins/contentstack';
import Links from '../typescript/data';

interface PageResponse {
  title: string;
  url: string;
}

const response = useState('response', () => {})

useAsyncData('getHeader', async () => {
    const result = await Stack.getEntries({
    contentTypeUid: 'header',
    referenceFieldPath: `navigation_menu.page_reference`,
    jsonRtePath: ['notification_bar.announcement_text'],
    })
    const responsePages: [PageResponse] = await Stack.getEntries({
    contentTypeUid: 'page',
    })
    const navHeaderList = result[0].navigation_menu
    if (responsePages.length !== result.length) {
    responsePages.forEach((entry) => {
        const hFound = result[0].navigation_menu.find(
        (navLink: Links) => navLink.label === entry.title
        )
        if (!hFound) {
        navHeaderList.push({
            label: entry.title,
            page_reference: [{ title: entry.title, url: entry.url }],
        })
        }
    })
    }
    result[0].navigation_menu = navHeaderList
    response.value = result[0];
    return response
})

onMounted(() => {
  onEntryChange(async () => {
    if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
      const response = await fetchData()
    }
  })
})

const fetchData = async() => {
  const result = await Stack.getEntries({
    contentTypeUid: 'header',
    referenceFieldPath: `navigation_menu.page_reference`,
    jsonRtePath: ['notification_bar.announcement_text']
  })
  const responsePages: [PageResponse] = await Stack.getEntries({
    contentTypeUid: 'page'
  })
  const navHeaderList = result[0].navigation_menu
  if (responsePages.length !== result.length) {
    responsePages.forEach((entry) => {
      const hFound = result[0].navigation_menu.find(
        (navLink: Links) => navLink.label === entry.title
      )
      if (!hFound) {
        navHeaderList.push({
          label: entry.title,
          page_reference: [{ title: entry.title, url: entry.url }]
        })
      }
    })
  }
  result[0].navigation_menu = navHeaderList
  return result
}
</script>
