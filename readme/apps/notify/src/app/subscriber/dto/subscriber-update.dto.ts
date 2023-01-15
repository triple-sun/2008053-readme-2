import { PartialType } from '@nestjs/swagger';
import { SubscriberCreateDTO } from './subscriber-create.dto';

export class SubscriberUpdateDTO extends PartialType(SubscriberCreateDTO) {}
