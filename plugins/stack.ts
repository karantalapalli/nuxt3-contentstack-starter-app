import contentstack from 'contentstack'


let Stack: any = null;

function initStack($config: any){    
    if(Stack != null) return Stack;

    Stack = contentstack.Stack({
    delivery_token: $config.CONTENTSTACK_DELIVERY_TOKEN,
    api_key: $config.CONTENTSTACK_API_KEY,
    environment: $config.CONTENTSTACK_ENVIRONMENT,
    region: $config.CONTENTSTACK_REGION
        ? $config.CONTENTSTACK_REGION
        : 'us',
    })
    console.log("Stack ----------->", Stack);
    return Stack;
}   

export default initStack