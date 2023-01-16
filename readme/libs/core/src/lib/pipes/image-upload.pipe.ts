import { FileTypeValidator, ParseFilePipe, MaxFileSizeValidator } from "@nestjs/common";
import { imageExtRegExp } from "../utils/common.utils";

export class ImageUploadPipe extends ParseFilePipe {
  constructor(maxSize: number) {
    super({
      validators: [
        new FileTypeValidator({fileType: imageExtRegExp}),
        new MaxFileSizeValidator({maxSize})
      ]
    })
  }
}
