// global store

interface StateObject{
  header: {};
  footer: {};
  page: {};
  blogPost: {}
}

export const state = () => ({
  header: null,
  footer: null,
  page: null,
  blogPost: null,
})
export const mutations = {
  setHeader(stateObj : StateObject , data : {}) {
    stateObj.header = data
  },
  setFooter(stateObj : StateObject , data : {}) {
    stateObj.footer = data
  },
  setPage(stateObj : StateObject , data : {}) {
    stateObj.page = data
  },
  setBlogpost(stateObj : StateObject , data : {}) {
    stateObj.blogPost = data
  },
}
