import { Material, MaterialItem, StackingStrategy } from '@gamepark/rules-api'
import { uniq } from 'lodash'

export class PlayerTilesInGameLocationStrategy extends StackingStrategy {
  addItem(material: Material, item: MaterialItem) {
    item.location.x = this.getItemX(material, item)
    item.location.y = this.getItemY(material, item)
    super.addItem(material, item)
  }

  private getItemX(material: Material, item: MaterialItem) {
    if (item.location.x !== undefined) return item.location.x
    const tilesWithSameColor = material.getItems().filter((it) => it.location.y === item.location.y)
    return tilesWithSameColor.length
  }

  private getItemY(material: Material, item: MaterialItem) {
    if (item.location.y !== undefined) return item.location.y
    const familiesWithDifferentColor = uniq(material.getItems().map((it) => it.location.y))
    return familiesWithDifferentColor.length
  }
}
