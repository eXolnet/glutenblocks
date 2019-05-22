export const parseUrl = ({ url, enableCaption, ccLang, start, end }) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?v=([^&\s]+)(?:&t=(\d+)s?)?).*)|(?:v(\/.*)|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/;
    const matches = url.match(youtubeRegex);

    return `https://www.youtube.com/embed/${matches[1]}?enablejsapi=1${ enableCaption ? '&cc_load_policy=1&cc_lang_pref=' + ccLang : ''}${ start ? '&start=' + start : '' }${ end ? '&end=' + end : '' }`;
};
