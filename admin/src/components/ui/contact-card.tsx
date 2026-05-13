import classNames from 'classnames';

interface PhoneNumberProps {
  number: any;
  checked?: boolean;
}

export function ContactCard({ checked, number }: PhoneNumberProps) {
  return (
    <div
      className={classNames(
        'relative p-4 h-full rounded border cursor-pointer group hover:border-accent',
        {
          'border-accent shadow-sm bg-light': checked,
          'bg-gray-100 border-transparent': !checked,
        }
      )}
    >
      <p className="text-sm text-heading font-semibold capitalize">{number}</p>
    </div>
  );
}

export default ContactCard;
