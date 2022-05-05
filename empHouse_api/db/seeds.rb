# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Employee.destroy_all


PASSWORD = "abcd"
supervisor = Employee.create(
    first_name: "yuvi",
    last_name: "goraya",
    email: "yuvi@goraya.com",
    password: PASSWORD,
    is_supervisor: true,
    mhe_license: true,
    avg_rating: 5
)
8.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    Employee.create(
        first_name: first_name,
        last_name: last_name,
        email: "#{first_name}@#{last_name}.com",
        password: PASSWORD,
        mhe_license: [true,false].sample,
        avg_rating: [1,2,3,4].sample
    )
end

sizes = [20,40,45]
sub_times = ['AM','PM','GY']

20.times do 
    Container.create(
        number: Faker::Number.number(digits: 5),
        customer: 'WMC',
        size: sizes[rand(0..2)],
        weight: Faker::Number.between(from: 2000, to: 20000),
        boxes: Faker::Number.between(from: 150, to: 2000),
        due_date: Faker::Date.between(from: '2022-05-01', to: '2022-06-01'),
        status: "due",
        started_at: nil,
        end_at: nil,
    )
end

employees = Employee.all
containers = Container.all

puts Cowsay.say("Generated #{employees.count} employees", :koala)
puts Cowsay.say("Generated #{containers.count} containers", :frogs)