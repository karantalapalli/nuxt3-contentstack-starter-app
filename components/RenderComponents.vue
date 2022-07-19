<template>
  <main
    v-if="components"
    :data-pageref="entryUid"
    data-contenttype="page"
    :data-locale="locale"
  >
    <template v-for="(component, index) in components">
      <HeroBanner
        v-if="component.hero_banner && page === 'Home'"
        :key="'hero_banner' + index"
        title="home-content"
        :data="component.hero_banner"
      />
      <HeroBanner
        v-if="component.hero_banner && page !== 'Home'"
        :key="'hero_banner' + index"
        title="about-content"
        :data="component.hero_banner"
      />
      <Section
        v-if="component.section"
        :key="'section' + index"
        :data="component.section"
      />
      <BlogSection
        v-if="component.from_blog"
        :key="'from_blog' + index"
        :data="component.from_blog"
      />
      <SectionWithCards
        v-if="component.section_with_cards"
        :key="'section_with_cards' + index"
        :data="component.section_with_cards"
      />
      <SectionWithBuckets
        v-if="component.section_with_buckets && page === 'Home'"
        :key="'section_with_buckets' + index"
        :data="component.section_with_buckets"
      />
      <AboutSectionBucket
        :key="'section_with_buckets' + index"
        v-else-if="component.section_with_buckets && page === 'About Us'"
        :data="component.section_with_buckets"
      />
      <TeamSection
        v-if="component.our_team"
        :key="'our_team' + index"
        :data="component.our_team"
      />
      <SectionWithEmbedObject
        v-if="component.section_with_html_code && page === 'Contact Us'"
        :key="'section_with_html_code' + index"
        :data="component.section_with_html_code"
      />
      <SectionWithEmbedObject
        v-if="component.section_with_html_code && page !== 'Contact Us'"
        :key="'section_with_html_code' + index"
        :data="component.section_with_html_code"
      />
    </template>
  </main>
</template>

<script setup>
   const props = defineProps({
        components: Array,
        page: String,
        entryUid: String,
        locale: String
   })
</script>
