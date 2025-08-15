import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match', async: false })
export class Match implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments): boolean {
    const propertyToMatch: string = args.constraints[0] as string;
    const valueToMatch: unknown = (args.object as Record<string, unknown>)[propertyToMatch];
    return value === valueToMatch;
  }

  defaultMessage(args: ValidationArguments): string {
    const propertyToMatch: string = args.constraints[0] as string;
    return `O valor de ${args.property} deve ser igual ao campo ${propertyToMatch}`;
  }
}
