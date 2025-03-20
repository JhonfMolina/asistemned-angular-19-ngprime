import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {
  transform(value: string): string {
    const defaultImagePath =
      '../../../../assets/images/avatar-image-for-profile.png';
    return value ? value : defaultImagePath;
  }
}
