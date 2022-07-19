interface Seo {
    meta_title: string;
    meta_description: string;
    keywords: string;
  }

interface Banner {
    locale: string;
    page_components: [];
    seo: Seo;
    title: string;
    url: string;
  }

interface Path{
  fullPath: string;
  path: string;
}

export default interface Data {
    locale: string;
    page_components: [];
    publish_details: object;
    seo: object;
    title: string;
    uid: string;
    url: string;
  }

export default interface PageData{
  route: Path;
}

export default interface Req {
    banner: Banner;
    data: Banner
  }
