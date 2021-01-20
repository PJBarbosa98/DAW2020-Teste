fpath = 'batismos.json'

data = open(fpath, 'r')
lines = data.readlines()

out = open('batismos_new.json', 'w')

for line in lines:
	line = line.strip()
	
	# Adicionar " " para envolver as keys.
	tag = line.split(':')
	if len(tag) > 1:
		line = line.replace(tag[0], '"' + str(tag[0]) + '"')
	
	# Criação do campo _id.
	if tag[0].strip() == "ref":
		line_with_id = line.replace("ref", "_id").replace('/', '-')
		out.write(line_with_id + '\n')
	
	# Buscar campos 'pai' e 'mae'.
	if tag[0].strip() == "title":
		pai = line.split('Pai:')[1].split(';')[0].strip()
		mae = line.split('Mãe:')[1][:-2].strip()
		out.write('"pai": "' + str(pai) + '",\n')
		out.write('"mae": "' + str(mae) + '",\n')

	out.write(line)

out.close()
data.close()
