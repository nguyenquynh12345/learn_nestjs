import { PartialType } from '@nestjs/mapped-types';
import { SearchListingDto } from './create-search.dto';

export class UpdateSearchDto extends PartialType(SearchListingDto) { }
