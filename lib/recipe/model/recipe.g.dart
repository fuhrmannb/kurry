// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'recipe.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Recipe _$RecipeFromJson(Map<String, dynamic> json) {
  $checkKeys(json, requiredKeys: const [
    'id',
    'title',
    'img',
    'tags',
    'time',
    'servings',
    'ingredients',
    'steps',
    'notes'
  ]);
  return Recipe()
    ..id = json['id'] as String
    ..title = json['title'] as String
    ..img = json['img'] as String
    ..tags = (json['tags'] as List)?.map((e) => e as String)?.toList()
    ..time = json['time'] as int
    ..servings = json['servings'] as int
    ..ingredients = (json['ingredients'] as List)
        ?.map((e) => e == null
            ? null
            : RecipeIngredient.fromJson(e as Map<String, dynamic>))
        ?.toList()
    ..steps = (json['steps'] as List)?.map((e) => e as String)?.toList()
    ..notes = json['notes'] as String;
}

Map<String, dynamic> _$RecipeToJson(Recipe instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'img': instance.img,
      'tags': instance.tags,
      'time': instance.time,
      'servings': instance.servings,
      'ingredients': instance.ingredients,
      'steps': instance.steps,
      'notes': instance.notes,
    };

RecipeIngredient _$RecipeIngredientFromJson(Map<String, dynamic> json) {
  $checkKeys(json, requiredKeys: const ['spec']);
  return RecipeIngredient()
    ..spec = json['spec'] == null
        ? null
        : RecipeIngredientSpec.fromJson(json['spec'] as Map<String, dynamic>)
    ..amount = json['amount'] as int
    ..unit = json['unit'] as String;
}

Map<String, dynamic> _$RecipeIngredientToJson(RecipeIngredient instance) {
  final val = <String, dynamic>{
    'spec': instance.spec,
  };

  void writeNotNull(String key, dynamic value) {
    if (value != null) {
      val[key] = value;
    }
  }

  writeNotNull('amount', instance.amount);
  writeNotNull('unit', instance.unit);
  return val;
}

RecipeIngredientFoodDB _$RecipeIngredientFoodDBFromJson(
    Map<String, dynamic> json) {
  $checkKeys(json, requiredKeys: const ['ref']);
  return RecipeIngredientFoodDB()..ref = json['ref'] as String;
}

Map<String, dynamic> _$RecipeIngredientFoodDBToJson(
        RecipeIngredientFoodDB instance) =>
    <String, dynamic>{
      'ref': instance.ref,
    };

RecipeIngredientCustom _$RecipeIngredientCustomFromJson(
    Map<String, dynamic> json) {
  $checkKeys(json, requiredKeys: const ['name']);
  return RecipeIngredientCustom()..name = json['name'] as String;
}

Map<String, dynamic> _$RecipeIngredientCustomToJson(
        RecipeIngredientCustom instance) =>
    <String, dynamic>{
      'name': instance.name,
    };
