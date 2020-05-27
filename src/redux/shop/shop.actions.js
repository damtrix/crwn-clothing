import ShopActionTypes from './shop.types'

export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATED_COLLECTION,
    payload: collectionsMap
})