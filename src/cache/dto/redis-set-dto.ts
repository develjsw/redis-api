import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString } from 'class-validator';

export class RedisSetDto {
    @IsNotEmpty()
    @IsString()
    key: string;

    @IsNotEmptyObject()
    @IsObject()
    value: object;

    @IsNotEmpty()
    @IsNumber()
    // TODO : 값 제한 둬야함
    expire: number; // ms
}
