<template>
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">
            JSON Preview
          </h2>
          <div
            class="tooltip-wrapper"
            @:click="copyObject(JSON.stringify(response))"
          >
            <div class="tooltip-copy">
              <img src="../static/copy.svg" class="copyIcon" alt="copy icon" />
              <div v-if="componentKey > 0" class="tooltip-top-copy">
                {{ messageCopied }}
              </div>
              <div v-else class="tooltip-top-copy">
                {{ messageCopy }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <pre v-if="response" id="jsonViewer">
            <json-viewer
              :value="response"
               :copyable="false"
              >
              </json-viewer>
          </pre>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Header {
  local: string;
  logo: string;
  navigation_menu: [];
  notification_bar: string;
  title: string;
}

interface Footer {
  local: string;
  logo: string;
  copyright: string;
  navigation: [];
  social: string;
  title: string;
}

interface Response {
    page?: string;
    blog_post?: string;
    headers: Header;
    footer: Footer;
}

const data = () => {
  const { header, footer, page, blogPost } = this.$store.state
  let response: Response = {
    headers: header || null,
    footer: footer || null
  }
  page && (response.page = page)
  blogPost && (response.blog_post = blogPost)
  response = filterObject(response)
  return {
    response,
    messageCopy: 'Copy',
    messageCopied: 'Copied',
    componentKey: 0
  }
}

updated(() => {
  componentKey &&
    setTimeout(() => {
      componentKey = 0
  }, 300)
})

const copyObject = (response: string) => {
  navigator.clipboard.writeText(response)
  componentKey++
}

const filterObject = (inputObject: any) => {
  const unWantedProps = [
    'uid',
    '_version',
    'ACL',
    '_in_progress',
    'created_at',
    'created_by',
    'updated_at',
    'updated_by',
    'publish_details'
  ]
  for (const key in inputObject) {
    unWantedProps.includes(key) && delete inputObject[key]
    if (typeof inputObject[key] !== 'object') {
      continue
    }
    inputObject[key] = filterObject(inputObject[key])
  }
  return inputObject
}
</script>
