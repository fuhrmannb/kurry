import 'package:breakpoint/breakpoint.dart';
import 'package:flutter/material.dart';

import 'model/recipe.dart';

class RecipeList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (_, constraints) {
      final breakpoint = Breakpoint.fromConstraints(constraints);
      return GridView.count(
        crossAxisCount: breakpoint.columns ~/ 4,
        mainAxisSpacing: breakpoint.gutters,
        crossAxisSpacing: breakpoint.gutters,
        childAspectRatio: 2,
        children: <Widget>[
          RecipeCard(
            recipe: Recipe(),
          )
        ],
      );
    });
  }
}

class RecipeCard extends StatelessWidget {
  final Recipe recipe;

  const RecipeCard({this.recipe});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          const ListTile(
            leading: Icon(Icons.album),
            title: Text('Riz au thon'),
          ),
          ButtonBar(
            children: <Widget>[
              FlatButton(
                child: const Text('Edit'),
                onPressed: () {/* ... */},
              ),
              FlatButton(
                child: const Text('Delete'),
                onPressed: () {/* ... */},
              ),
            ],
          ),
        ],
      ),
    );
  }
}
