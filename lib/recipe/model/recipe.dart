import 'package:json_annotation/json_annotation.dart';

part 'recipe.g.dart';

@JsonSerializable()
class Recipe {
  @JsonKey(required: true)
  String id;
  @JsonKey(required: true)
  String title;
  @JsonKey(required: true)
  String img;
  @JsonKey(required: true)
  List<String> tags;
  @JsonKey(required: true)
  int time;
  @JsonKey(required: true)
  int servings;
  @JsonKey(required: true)
  List<RecipeIngredient> ingredients;
  @JsonKey(required: true)
  List<String> steps;
  @JsonKey(required: true)
  String notes;

  Recipe();

  factory Recipe.fromJson(Map<String, dynamic> json) => _$RecipeFromJson(json);
  Map<String, dynamic> toJson() => _$RecipeToJson(this);
}

@JsonSerializable()
class RecipeIngredient {
  @JsonKey(required: true)
  RecipeIngredientSpec spec;

  @JsonKey(includeIfNull: false)
  int amount;
  @JsonKey(includeIfNull: false)
  String unit;

  RecipeIngredient();

  factory RecipeIngredient.fromJson(Map<String, dynamic> json) =>
      _$RecipeIngredientFromJson(json);
  Map<String, dynamic> toJson() => _$RecipeIngredientToJson(this);
}

enum RecipeIngredientSpecType {
  fooddb,
  custom,
}

abstract class RecipeIngredientSpec {
  final RecipeIngredientSpecType type;

  factory RecipeIngredientSpec.fromJson(Map<String, dynamic> json) {
    switch (json['type']) {
      case 'fooddb':
        return _$RecipeIngredientFoodDBFromJson(json);
      case 'custom':
        return _$RecipeIngredientCustomFromJson(json);
      default:
        // TODO:
        throw 'unknown RecipeIngredientSpec type!';
    }
  }

  Map<String, dynamic> toJson() {
    switch (type) {
      case RecipeIngredientSpecType.fooddb:
        return _$RecipeIngredientFoodDBToJson(this)..addAll({'type': 'fooddb'});
      case RecipeIngredientSpecType.custom:
        return _$RecipeIngredientCustomToJson(this)..addAll({'type': 'custom'});
      default:
        // TODO:
        throw 'should never happen!';
    }
  }

  RecipeIngredientSpec(this.type);
}

@JsonSerializable()
class RecipeIngredientFoodDB extends RecipeIngredientSpec {
  @JsonKey(required: true)
  String ref;

  RecipeIngredientFoodDB() : super(RecipeIngredientSpecType.fooddb);
}

@JsonSerializable()
class RecipeIngredientCustom extends RecipeIngredientSpec {
  @JsonKey(required: true)
  String name;

  RecipeIngredientCustom() : super(RecipeIngredientSpecType.custom);
}
