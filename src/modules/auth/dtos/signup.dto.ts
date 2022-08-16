import { IsString, IsNotEmpty } from 'class-validator';

export class SignUpDto {

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public username!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;

}
