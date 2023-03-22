import { create, all } from 'mathjs';

const math = create(all);

function aSum(args, math, scope) {
	try {
		const el = args[0].compile().evaluate(scope)
		const expr = args[1].compile()
		const result = math.sum(el.map(i => expr.evaluate(i)))

		return result || 0
	} catch (error) {
		console.error(error)
		return 0
	}
}

aSum.rawArgs = true

math.import({
	aSum
})

function d(t:any, defaults=0) {
	if(t === null) return defaults;
	if(t === undefined) return defaults;
	return t;
}

math.import({
	d
})
function toSlug(str: unknown) {
	if (typeof str !== 'string') {
		return '';
	}

	let res = str.replace(/^\s+|\s+$/g, ''); // trim
	res = res.toLowerCase();

	// remove accents
	const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ';
	const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
	for (let i = 0, l = from.length; i < l; i++) {
		res = res.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	res = res
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return res;
}

math.import({
	toSlug
})

export function compileFormula(exp: string): any {
	const compiled = math.compile(exp);

	return (values:Object) => {
		const scope = {
			'$CURRENT_USER': values['__currentUser'],
			'$PARENTS': values['__parents'],
			...values
		};
		console.log(scope)

		return compiled.evaluate(scope);
	}
}


