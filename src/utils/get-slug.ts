import { UrlTree } from '@angular/router';

export const getSlug = (urlTree: UrlTree) => {
    const slug = urlTree.root.children['primary'].segments.pop()?.path;
    return slug ?? ``;
};
